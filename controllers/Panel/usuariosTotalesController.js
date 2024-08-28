const { Op, fn, col, literal } = require("sequelize");
const Clientes = require("../../Models/clientes");
const Ventas = require("../../Models/ventas");
const Compras = require("../../Models/compras");
const Servicios = require("../../Models/servicios");
const Agenda = require("../../Models/agendamiento");
const Empleados = require("../../Models/empleados");

const contarClientes = async (req, res) => {
  try {
    const totalClientes = await Clientes.count();
    console.log("Total clientes:", totalClientes);

    res.json({ totalClientes });
  } catch (error) {
    console.error("Error al contar los clientes:", error);
    res.status(500).json({ error: "Error al contar los clientes" });
  }
};

const contarVentas = async (req, res) => {
  try {
    const totalVentas = await Ventas.count({
      where: {
        Estado: 1,
      },
    });
    console.log("Total ventas con Estado 3:", totalVentas);

    res.json({ totalVentas });
  } catch (error) {
    console.error("Error al contar las ventas:", error);
    res.status(500).json({ error: "Error al contar las ventas" });
  }
};

const contarCompras = async (req, res) => {
  try {
    const totalCompras = await Compras.count({
      where: {
        estado_compra: {
          [Op.in]: ["En espera", "Terminada"],
        },
      },
    });
    console.log(
      "Total compras con estado 'En espera' o 'Terminada':",
      totalCompras
    );

    res.json({ totalCompras });
  } catch (error) {
    console.error("Error al contar las compras:", error);
    res.status(500).json({ error: "Error al contar las compras" });
  }
};

const contarServicios = async (req, res) => {
  try {
    const totalServicios = await Servicios.count({
      where: {
        EstadoServicio: 1,
      },
    });
    console.log(
      "Total servicios con estado 'En espera' o 'Terminada':",
      totalServicios
    );

    res.json({ totalServicios });
  } catch (error) {
    console.error("Error al contar las servicios:", error);
    res.status(500).json({ error: "Error al contar las servicios" });
  }
};

const contarEmpleados = async (req, res) => {
  try {
    const totalEmpleados = await Empleados.count({
      where: {
        Estado: 1,
      },
    });
    console.log(
      "Total empleados con estado 'En espera' o 'Terminada':",
      totalEmpleados
    );

    res.json({ totalEmpleados });
  } catch (error) {
    console.error("Error al contar las empleados:", error);
    res.status(500).json({ error: "Error al contar las empleados" });
  }
};

const obtenerServiciosMasAgendados = async (req, res) => {
  try {
    console.log("Iniciando consulta de agendamientos...");

    //Obtener todos los agendamientos
    const agendamientos = await Agenda.findAll({
      attributes: ["IdServicio"],
      raw: true,
    });

    console.log("Agendamientos obtenidos:", agendamientos);

    //Contabilizar los agendamientos por servicio
    const conteos = {};
    for (const agendamiento of agendamientos) {
      const servicioId = agendamiento.IdServicio;
      if (conteos[servicioId]) {
        conteos[servicioId]++;
      } else {
        conteos[servicioId] = 1;
      }
    }

    console.log("Conteos de agendamientos:", conteos);

    //Obtener los servicios con su precio
    const serviciosMasAgendados = await Servicios.findAll({
      where: {
        IdServicio: Object.keys(conteos),
      },
      attributes: [
        "IdServicio",
        "Nombre_Servicio",
        "Precio_servicio",
        "ImgServicio",
      ],
      raw: true,
    });

    console.log("Servicios obtenidos:", serviciosMasAgendados);

    //Combinar los servicios con los conteos de agendamientos
    const serviciosConConteos = serviciosMasAgendados.map((servicio) => ({
      IdServicio: servicio.IdServicio,
      ImgServicio: servicio.ImgServicio,
      Nombre_Servicio: servicio.Nombre_Servicio,
      Precio_servicio: servicio.Precio_servicio,
      cantidadAgendamientos: conteos[servicio.IdServicio] || 0,
    }));

    //Ordenar los servicios por cantidad de agendamientos
    serviciosConConteos.sort(
      (a, b) => b.cantidadAgendamientos - a.cantidadAgendamientos
    );

    console.log("Servicios ordenados:", serviciosConConteos);

    //Seleccionar los 4 servicios más agendados
    const topServicios = serviciosConConteos.slice(0, 4);

    console.log("Servicios más agendados:", topServicios);

    //Enviar la respuesta al cliente
    res.json(topServicios);
  } catch (error) {
    console.error("Error al obtener los servicios más agendados:", error);
    res
      .status(500)
      .json({ error: "Error al obtener los servicios más agendados" });
  }
};

module.exports = {
  contarClientes,
  contarVentas,
  contarCompras,
  contarServicios,
  contarEmpleados,
  obtenerServiciosMasAgendados,
};
