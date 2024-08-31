const Ventas = require("../../Models/ventas");
const Cliente = require("../../Models/clientes");
const Empleado = require("../../Models/empleados");
const Servicio = require("../../Models/servicios");

async function registrarVenta(req, res) {
  try {
    // Obtener los datos de la solicitud, excluyendo Fecha
    const {
      IdCliente,
      idEmpleado,
      idServicio,

      Subtotal,
      Descuento,
      Total,
      Estado,
    } = req.body;

    // Verificar si los IDs de cliente, empleado y servicio existen en la base de datos
    const cliente = await Cliente.findByPk(IdCliente);
    const empleado = await Empleado.findByPk(idEmpleado);
    const servicio = await Servicio.findByPk(idServicio);

    // Si alguno de los IDs no existe, devolver un error
    if (!cliente) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }
    if (!empleado) {
      return res.status(404).json({ error: "Empleado no encontrado" });
    }
    if (!servicio) {
      return res.status(404).json({ error: "Servicio no encontrado" });
    }

    // Obtener la fecha y hora actual del sistema
    const fechaActual = new Date();

    // Crear una nueva venta
    const nuevaVenta = await Ventas.create({
      IdCliente,
      idEmpleado,
      idServicio,

      Subtotal,
      Fecha: fechaActual, // Usar la fecha y hora actuales sin ajustar
      Descuento,
      Total,
      Estado,
    });

    // Devolver la nueva venta creada
    console.log(`Venta registrada con id ${nuevaVenta.idVentas}`);
    res.status(201).json(nuevaVenta);
  } catch (error) {
    console.error("Ocurrió un error al registrar la venta:", error);
    res.status(500).json({ error: "Hubo un error al procesar la solicitud" });
  }
}

module.exports = {
  registrarVenta,
};
