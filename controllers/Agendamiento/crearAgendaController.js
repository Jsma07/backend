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

    // Obtener los datos del cuerpo de la solicitud
    const { IdCliente, IdServicio, Fecha, Hora, IdEmpleado, EstadoAgenda,  } = req.body;
    
    // Si IdCliente no viene en el cuerpo de la solicitud, utilizar el id del cliente logueado
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

    const horario = await Horario.findOne({
      where: {
        fecha: dayjs(Fecha).format('YYYY-MM-DD')
      }
    });

    if (horario && horario.estado === 'inactivo') {
      return res.status(400).json({ error: 'Esta Fecha está inactiva, No se pueden crear citas' });
    }

    const duracion = servicio.Tiempo_Servicio;
    const horasOcupadas = [];
    const horaInicio = dayjs(`${Fecha} ${Hora}`);

    for (let i = 0; i <= Math.floor(duracion / 60); i++) {
      horasOcupadas.push(horaInicio.add(i, 'hour').format('HH:mm'));
    }

    const citasExistentes = await Agendamiento.findAll({
      where: {
        Fecha,
        Hora: horasOcupadas
      }
    });

    if (citasExistentes.length > 0) {
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
