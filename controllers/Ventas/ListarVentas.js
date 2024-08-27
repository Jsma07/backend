const Ventas = require("../../Models/ventas");
const Cliente = require("../../Models/clientes");
const Empleado = require("../../Models/empleados");
const Servicio = require("../../Models/servicios");

async function ListarVentas(req, res) {
  try {
    const listaVentas = await Ventas.findAll({
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
          attributes: ["ImgServicio", "Nombre_Servicio", "Precio_Servicio"],
        },
      ],
    });
    res.json(listaVentas);
  } catch (error) {
    console.error("Ocurrió un error al listar las ventas:", error);
    res.status(500).json({ error: "Hubo un error al procesar la solicitud" });
  }
}

module.exports = {
  ListarVentas,
};
