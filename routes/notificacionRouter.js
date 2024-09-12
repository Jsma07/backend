const express = require('express');
const router = express.Router();
const authorize = require('../middleware/auth');

const notificacionesController = require('../controllers/Notificaciones/notificacionesController');

// Rutas para notificaciones
router.get('/api/notificaciones', notificacionesController.obtenerNotificaciones);
router.post('/api/notificaciones/crear',authorize([]),notificacionesController.crearNotificacion);
router.put('/api/notificaciones/:IdNotificacion/leido', notificacionesController.marcarNotificacionComoLeida);
router.delete('/api/notificaciones/:IdNotificacion', notificacionesController.eliminarNotificacion);

module.exports = router;
