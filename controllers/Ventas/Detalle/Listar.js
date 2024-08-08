const DetalleVentas = require("../../../Models/detalleventas");
const Ventas = require("../../../Models/ventas");
const Adiciones = require("../../../Models/adiciones");
const Cliente = require("../../../Models/clientes");
const Empleado = require("../../../Models/empleados");
const Servicio = require("../../../Models/servicios");

// Función para listar todos los detalles de ventas
async function ListarDetalleVentas(req, res) {
  try {
    const listaDetalleVentas = await DetalleVentas.findAll({
      include: [
        {
          model: Ventas,
          as: "venta",
          include: [
            {
              model: Cliente,
              as: "cliente",
              attributes: ["Nombre", "Apellido"],
            },
            {
              model: Empleado,
              as: "empleado",
              attributes: ["Nombre", "Apellido"],
            },
            {
              model: Servicio,
              as: "servicio",
              attributes: ["Nombre_Servicio", "ImgServicio"],
            },
          ],
        },
        {
          model: Adiciones,
          as: "adicion",
          attributes: ["NombreAdiciones", "Img", "Precio"],
        },
      ],
    });
    res.json(listaDetalleVentas);
  } catch (error) {
    console.error("Ocurrió un error al listar los detalles de ventas:", error);
    res.status(500).json({ error: "Hubo un error al procesar la solicitud" });
  }
}

async function BuscarDetalleVentaPorId(req, res) {
  const { id } = req.params;
  console.log("ID ENCONTRADO:", id);

  try {
    // Intenta obtener los detalles de la venta
    const detalleVenta = await DetalleVentas.findAll({
      where: { Idventa: id },
      include: [
        {
          model: Ventas,
          as: "venta",
          include: [
            {
              model: Cliente,
              as: "cliente",
              attributes: ["Nombre", "Apellido"],
            },
            {
              model: Empleado,
              as: "empleado",
              attributes: ["Nombre", "Apellido"],
            },
            {
              model: Servicio,
              as: "servicio",
              attributes: ["Nombre_Servicio", "ImgServicio"],
            },
          ],
          attributes: ["Subtotal", "Fecha", "Descuento", "Total", "Estado"],
        },
        {
          model: Adiciones,
          as: "adicion",
          attributes: ["NombreAdiciones", "Img", "Precio"],
        },
      ],
    });

    if (detalleVenta.length > 0) {
      // Agrupa las adiciones por Idventa si se encuentran detalles
      const ventasAgrupadas = detalleVenta.reduce((acc, curr) => {
        const idVenta = curr.Idventa;
        if (!acc[idVenta]) {
          acc[idVenta] = {
            idVenta,
            venta: curr.venta,
            adiciones: [],
          };
        }
        acc[idVenta].adiciones.push(curr.adicion);
        return acc;
      }, {});

      const resultado = Object.values(ventasAgrupadas);
      return res.json(resultado);
    } else {
      // Si no hay detalles, busca el resumen de la venta
      const ventaResumen = await Ventas.findOne({
        where: { idVentas: id },
        include: [
          {
            model: Cliente,
            as: "cliente",
            attributes: ["Nombre", "Apellido"],
          },
          {
            model: Empleado,
            as: "empleado",
            attributes: ["Nombre", "Apellido"],
          },
          {
            model: Servicio,
            as: "servicio",
            attributes: ["Nombre_Servicio", "ImgServicio"],
          },
        ],
        attributes: ["Subtotal", "Fecha", "Descuento", "Total", "Estado"],
      });

      if (!ventaResumen) {
        return res.status(404).json({ error: "Venta no encontrada" });
      }

      // Devuelve solo el resumen de la venta con una lista vacía de adiciones
      return res.json({
        idVenta: ventaResumen.idVentas,
        venta: ventaResumen,
        adiciones: [], // Vacío porque no hay detalles
      });
    }
  } catch (error) {
    console.error("Ocurrió un error al buscar el detalle de venta:", error);
    res.status(500).json({ error: "Hubo un error al procesar la solicitud" });
  }
}

module.exports = {
  ListarDetalleVentas,
  BuscarDetalleVentaPorId,
};
