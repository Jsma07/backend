const express = require('express');
const router = express.Router();
const Agendamiento = require('../../Models/agendamiento');
const authorize = require('../../middleware/auth'); // Asumiendo que tu middleware de autorización está en 'middleware/authorize'

// Ruta para obtener las citas agendadas del cliente actualconst misCitas = async (req, res) => {
  const misCitas = async (req, res) => {
    try {
      const idCliente = req.usuario.id; 
  
      const citas = await Agendamiento.findAll({
        where: { IdCliente: idCliente },
        include: [
          { model: require('../../Models/empleados'), as: 'empleado' },
          { model: require('../../Models/servicios'), as: 'servicio' }
        ]
      });
  
      if (citas.length === 0) {
        return res.status(200).json({ mensaje: 'No tienes citas agendadas.', citas: [] });
      }
  
      const citasFormateadas = citas.map(cita => {
        return {
          ...cita.toJSON(),
          Hora: cita.Hora ? cita.Hora.substring(0, 5) : null, // 'HH:mm'
          HoraFin: cita.HoraFin ? cita.HoraFin.substring(0, 5) : null, // 'HH:mm'
        };
      });
  
      res.json(citasFormateadas);
    } catch (error) {
      console.error('Error al obtener las citas agendadas:', error);
      res.status(500).json({ mensaje: 'Error al obtener las citas agendadas.' });
    }
  };

module.exports = { misCitas };
