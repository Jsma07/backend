const { validationResult } = require('express-validator');
const Agendamiento = require('../../Models/agendamiento');
const Cliente = require('../../Models/clientes');
const Empleado = require('../../Models/empleados');
const Servicio = require('../../Models/servicios');
const Horario = require('../../Models/horario');
const dayjs = require('dayjs');

exports.crearAgendamiento = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }

    const { IdCliente, IdServicio, Fecha, Hora, IdEmpleado, EstadoAgenda } = req.body;

    const cliente = await Cliente.findByPk(IdCliente);
    const empleado = await Empleado.findByPk(IdEmpleado);
    const servicio = await Servicio.findByPk(IdServicio);

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    if (!empleado) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }
    if (!servicio) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }

    // Verificar si la fecha está inactiva
    const horario = await Horario.findOne({
      where: {
        fecha: dayjs(Fecha).format('YYYY-MM-DD')
      }
    });
    
    console.log('Horario encontrado:', horario); // Añade este log para depurar

    if (horario && horario.estado === 'inactivo') {
      return res.status(400).json({ error: 'Esta Fecha esat inactiva, No se pueden crear citas' });
    }

    // Verifica si ya existe una cita en el mismo día y hora
    const citaExistente = await Agendamiento.findOne({
      where: {
        Fecha,
        Hora,
      },
    });

    if (citaExistente) {
      return res.status(400).json({ error: 'Ya existe una cita en la misma fecha y hora' });
    }

    const nuevoAgendamiento = await Agendamiento.create({
      IdCliente,
      IdServicio,
      Fecha,
      Hora,
      IdEmpleado,
      EstadoAgenda
    });

    res.status(201).json({ mensaje: 'Agendamiento creado exitosamente', agendamiento: nuevoAgendamiento });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errores = error.errors.map(err => err.message);
      return res.status(400).json({ errores });
    } else {
      console.error("Error al crear el agendamiento", error);
      res.status(500).json({ error: 'Error al crear el agendamiento' });
    }
  }
};
