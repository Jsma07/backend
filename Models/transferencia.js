const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, // Opcional, solo si necesitas especificar el puerto
  dialect: 'mysql',
});

const Agendamiento = require("./agendamiento");
const Ventas = require("./ventas");
const Cliente = require("./clientes");
const Empleado = require("./empleados");
const Servicio = require("./servicios");

// Función para transferir agendamientos a ventas
async function transferAgendamientosToVentas() {
  try {
    // Consultar agendamientos con estado 3
    const agendamientos = await Agendamiento.findAll({
      where: {
        EstadoAgenda: 3,
      },
    });

    for (const agenda of agendamientos) {
      // Obtener el servicio relacionado
      const servicio = await Servicio.findByPk(agenda.IdServicio);

      if (!servicio) {
        console.error(`Servicio con ID ${agenda.IdServicio} no encontrado.`);
        continue;
      }

      // Calcular el subtotal y el total
      const subtotal = servicio.Precio_Servicio; // El subtotal es el precio del servicio
      const total = subtotal; // Si no tienes otros cálculos, el total es igual al subtotal

      // Crear una nueva entrada en Ventas
      await Ventas.create({
        idServicio: agenda.IdServicio,
        IdCliente: agenda.IdCliente,
        idEmpleado: agenda.IdEmpleado,
        Iva: 0,
        Subtotal: subtotal,
        Fecha: new Date(),
        Descuento: 0,
        Total: total,
        Estado: 2,
      });

      // Actualizar el estado del agendamiento
      agenda.EstadoAgenda = 4;
      await agenda.save();
    }

    console.log("Transferencia completada");
  } catch (error) {
    console.error("Error durante la transferencia:", error);
  }
}

module.exports = transferAgendamientosToVentas;
