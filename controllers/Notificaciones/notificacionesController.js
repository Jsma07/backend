const { validationResult } = require('express-validator');
const Notificaciones = require('../../Models/notificaciones');
const Clientes = require('../../Models/clientes');
const Agendamiento = require('../../Models/agendamiento');

// Obtener todas las notificaciones
const obtenerNotificaciones = async (req, res) => {
  try {
    const notificaciones = await Notificaciones.findAll({
      include: [
        { model: Clientes, as: 'cliente' },
        { model: Agendamiento, as: 'agendamiento' }
      ]
    });
    res.status(200).json(notificaciones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las notificaciones', error });
  }
};

// Crear una nueva notificación
const crearNotificacion = async (req, res) => {
    try {
      console.log("Datos recibidos:", req.body);
      
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });
      }
  
      const { Tipo, Mensaje, IdAgenda } = req.body;
      const clienteId = req.usuario.id;
  
      console.log("Cliente ID:", clienteId);
      
      const cliente = await Clientes.findByPk(clienteId);
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
      }
  
      const notificacion = await Notificaciones.create({
        Tipo,
        Mensaje,
        IdAgenda,
        IdCliente: clienteId,
        Leido: false
      });
  
      res.status(201).json(notificacion);
    } catch (error) {
      console.error("Error en la creación de la notificación:", error);
      res.status(500).json({ message: 'Error al crear la notificación', error });
    }
  };


// Actualizar el estado de una notificación a "leído"
const marcarNotificacionComoLeida = async (req, res) => {
  const { IdNotificacion } = req.params;
  
  try {
    const notificacion = await Notificaciones.findByPk(IdNotificacion);
    if (!notificacion) {
      return res.status(404).json({ message: 'Notificación no encontrada' });
    }

    notificacion.Leido = true;
    await notificacion.save();
    
    res.status(200).json({ message: 'Notificación marcada como leída', notificacion });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la notificación', error });
  }
};

// Eliminar una notificación
const eliminarNotificacion = async (req, res) => {
  const { IdNotificacion } = req.params;
  
  try {
    const notificacion = await Notificaciones.findByPk(IdNotificacion);
    if (!notificacion) {
      return res.status(404).json({ message: 'Notificación no encontrada' });
    }

    await notificacion.destroy();
    res.status(200).json({ message: 'Notificación eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la notificación', error });
  }
};

module.exports = {
  obtenerNotificaciones,
  crearNotificacion,
  marcarNotificacionComoLeida,
  eliminarNotificacion
};
