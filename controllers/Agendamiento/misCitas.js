const express = require('express');
const router = express.Router();
const Agendamiento = require('../../Models/agendamiento');
const authorize = require('../../middleware/auth'); // Asumiendo que tu middleware de autorización está en 'middleware/authorize'

// Ruta para obtener las citas agendadas del cliente actual
exports.misCitas = async (req, res) => {
  try {
    const idCliente = req.usuario.id; // Usamos el id del cliente extraído del token JWT

    // Buscar todas las citas agendadas para el cliente actual
    const citas = await Agendamiento.findAll({
      where: { IdCliente: idCliente },
      include: [
        { model: require('../../Models/empleados'), as: 'empleado' },
        { model: require('../../Models/servicios'), as: 'servicio' }
      ]
    });

    // Si no hay citas agendadas
    if (citas.length === 0) {
      return res.status(404).json({ mensaje: 'No tienes citas agendadas.' });
    }

    // Devolver las citas en la respuesta
    res.json(citas);
  } catch (error) {
    console.error('Error al obtener las citas agendadas:', error);
    res.status(500).json({ mensaje: 'Error al obtener las citas agendadas.' });
  }
}

