const { Op, fn, col } = require("sequelize");
const Compras = require("../../Models/compras");
const Ventas = require("../../Models/ventas");
const Agenda = require("../../Models/agendamiento");
const Insumos = require("../../models/insumos");
const DetalleCompra = require("../../models/detallecompra");

const compararSemana = async (req, res) => {
  try {
    const inicioSemana = new Date();
    inicioSemana.setDate(inicioSemana.getDate() - inicioSemana.getDay());
    inicioSemana.setHours(0, 0, 0, 0);

    const finSemana = new Date(inicioSemana);
    finSemana.setDate(finSemana.getDate() + 6);
    finSemana.setHours(23, 59, 59, 999);

    const sumaCompras = await Compras.sum("total_compra", {
      where: {
        fecha_compra: {
          [Op.between]: [inicioSemana, finSemana],
        },
      },
    });

    const sumaVentas = await Ventas.sum("Total", {
      where: {
        Fecha: {
          [Op.between]: [inicioSemana, finSemana],
        },
      },
    });

    res.json({
      sumaCompras,
      sumaVentas,
      comparacion: sumaVentas - sumaCompras,
    });
  } catch (error) {
    console.error("Error al comparar compras y ventas:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const ventasPorMes = async (req, res) => {
  try {
    const inicioMesActual = new Date();
    inicioMesActual.setDate(1);
    inicioMesActual.setHours(0, 0, 0, 0);

    const ventas = await Ventas.findAll({
      attributes: [
        [fn("YEAR", col("Fecha")), "año"],
        [fn("MONTH", col("Fecha")), "mes"],
        [fn("SUM", col("Total")), "totalVentas"],
      ],
      where: {
        Fecha: {
          [Op.lte]: new Date(),
        },
      },
      group: ["año", "mes"],
      order: [
        ["año", "DESC"],
        ["mes", "DESC"],
      ],
    });

    res.json(ventas);
  } catch (error) {
    console.error("Error al obtener ventas por mes:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const contarEstadosAgenda = async (req, res) => {
  try {
    const estado1 = await Agenda.count({
      where: {
        EstadoAgenda: 1,
      },
    });

    const estado2 = await Agenda.count({
      where: {
        EstadoAgenda: 2,
      },
    });

    const estado3 = await Agenda.count({
      where: {
        EstadoAgenda: 3,
      },
    });

    res.json({ estado1, estado2, estado3 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al contar los registros" });
  }
};

const agendamientosPorMes = async (req, res) => {
  try {
    const inicioMesActual = new Date();
    inicioMesActual.setDate(1);
    inicioMesActual.setHours(0, 0, 0, 0);

    const agendamientos = await Agenda.findAll({
      attributes: [
        [fn("YEAR", col("fecha")), "año"],
        [fn("MONTH", col("fecha")), "mes"],
        [fn("COUNT", col("IdAgenda")), "totalAgendamientos"],
      ],
      where: {
        Fecha: {
          [Op.gte]: inicioMesActual,
        },
      },
      group: ["año", "mes"],
      order: [
        ["año", "DESC"],
        ["mes", "DESC"],
      ],
    });

    res.json(agendamientos);
  } catch (error) {
    console.error("Error al obtener agendamientos por mes:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const insumosMasComprados = async (req, res) => {
  try {
    console.log("Iniciando consulta de detalles de compras...");

    // Consulta para obtener todos los detalles de compras
    const detallesCompras = await DetalleCompra.findAll({
      attributes: ["IdInsumo", "cantidad_insumo"],
      raw: true,
    });

    console.log("Detalles de compras obtenidos:", detallesCompras);

    // Contar la cantidad de cada insumo
    const conteos = {};
    for (const detalle of detallesCompras) {
      const { IdInsumo, cantidad_insumo } = detalle;
      if (conteos[IdInsumo]) {
        conteos[IdInsumo] += cantidad_insumo;
      } else {
        conteos[IdInsumo] = cantidad_insumo;
      }
    }

    console.log("Conteos de insumos:", conteos);

    // Ordenar los insumos por cantidad comprada en orden descendente
    const insumosOrdenados = Object.entries(conteos)
      .map(([IdInsumo, cantidadCompras]) => ({ IdInsumo, cantidadCompras }))
      .sort((a, b) => b.cantidadCompras - a.cantidadCompras)
      .slice(0, 4); // Tomar los 4 insumos más comprados

    console.log("Insumos ordenados:", insumosOrdenados);

    // Obtener detalles de los insumos más comprados
    const insumosIds = insumosOrdenados.map((insumo) => insumo.IdInsumo);
    const insumosMasComprados = await Insumos.findAll({
      where: {
        IdInsumos: insumosIds,
      },
    });

    console.log("Insumos obtenidos:", insumosMasComprados);

    // Mapear los insumos con sus conteos de compras
    const insumosConConteos = insumosMasComprados.map((insumo) => {
      const detalle = insumosOrdenados.find(
        (d) => d.IdInsumo === insumo.IdInsumos
      );
      return {
        IdInsumo: insumo.IdInsumos,
        Nombre_Insumo: insumo.NombreInsumos, // Asegúrate de que el nombre del campo sea correcto
        cantidadCompras: detalle ? detalle.cantidadCompras : 0,
      };
    });

    console.log("Insumos con conteos:", insumosConConteos);

    // Enviar los 4 insumos más comprados como respuesta
    res.json(insumosConConteos);
  } catch (error) {
    console.error("Error al obtener los insumos más comprados:", error);
    res
      .status(500)
      .json({ error: "Error al obtener los insumos más comprados" });
  }
};

module.exports = {
  compararSemana,
  ventasPorMes,
  contarEstadosAgenda,
  agendamientosPorMes,
  insumosMasComprados,
};
