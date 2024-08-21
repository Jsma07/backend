// transferAgendamientos.js

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

const Agendamiento = require('./agendamiento');
const Ventas = require('./ventas');
const Cliente = require('./clientes');
const Empleado = require('./empleados');
const Servicio = require('./servicios');

// Función para transferir agendamientos a ventas
async function transferAgendamientosToVentas() {
  try {
    // Consultar agendamientos con estado 3
    const agendamientos = await Agendamiento.findAll({
      where: {
        EstadoAgenda: 3
      }
    });

    for (const agenda of agendamientos) {
      // Crear una nueva entrada en Ventas
      await Ventas.create({
        idServicio: agenda.IdServicio,
        IdCliente: agenda.IdCliente,
        idEmpleado: agenda.IdEmpleado,
        Iva: 0, 
        Subtotal: 0, 
        Fecha: new Date(),
        Descuento: 0, 
        Total: 0, 
        Estado: 2
      });

      agenda.EstadoAgenda = 4;
      await agenda.save();
    }

    console.log('Transferencia completada');
  } catch (error) {
    console.error('Error durante la transferencia:', error);
  }
}

module.exports = transferAgendamientosToVentas;
