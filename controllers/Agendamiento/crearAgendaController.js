const { validationResult } = require('express-validator');
const { Op } = require('sequelize');  // Asegúrate de importar Op de Sequelize
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
    
    const clienteId = IdCliente || req.usuario.id;

    const cliente = await Cliente.findByPk(clienteId);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    const empleado = await Empleado.findByPk(IdEmpleado);
    const servicio = await Servicio.findByPk(IdServicio);

    if (!empleado) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }
    if (!servicio) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }

    const fechaActual = dayjs();
    const fechaSeleccionada = dayjs(Fecha);

    // Verificar si la fecha seleccionada es el mismo día
    if (fechaSeleccionada.isSame(fechaActual, 'day')) {
      const horaSeleccionada = dayjs(`${Fecha} ${Hora}`);
      if (horaSeleccionada.isBefore(fechaActual, 'minute')) {
        return res.status(400).json({ error: 'No se puede seleccionar una hora pasada en el día actual' });
      }
    }

    const horario = await Horario.findOne({
      where: {
        fecha: dayjs(Fecha).format('YYYY-MM-DD')
      }
    });

    if (horario && horario.estado === 'inactivo') {
      return res.status(400).json({ error: 'Esta Fecha está inactiva, No se pueden crear citas' });
    }

    // Verificar si ya existe una cita para el cliente en la fecha seleccionada
    const citasExistentesCliente = await Agendamiento.findOne({
      where: {
        IdCliente: clienteId,
        Fecha: dayjs(Fecha).format('YYYY-MM-DD')
      }
    });

    if (citasExistentesCliente) {
      return res.status(400).json({ error: 'El cliente ya tiene una cita en esta fecha' });
    }

    const duracion = servicio.Tiempo_Servicio;
    const horasOcupadas = [];
    const horaInicio = dayjs(`${Fecha} ${Hora}`);

    for (let i = 0; i <= Math.floor(duracion / 60); i++) {
      horasOcupadas.push(horaInicio.add(i, 'hour').format('HH:mm'));
    }

    const citasExistentesHoras = await Agendamiento.findAll({
      where: {
        IdEmpleado,
        Fecha: dayjs(Fecha).format('YYYY-MM-DD'),
        Hora: { [Op.in]: horasOcupadas }, // Uso de operador `IN` para verificar múltiples horas
      }
    });

    if (citasExistentesHoras.length > 0) {
      return res.status(400).json({ error: 'Ya existe una cita en una de las horas seleccionadas' });
    }

    const nuevoAgendamiento = await Agendamiento.create({
      IdCliente: clienteId,
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
