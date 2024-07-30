const express = require('express');
const router = express.Router();
const salidaController = require('../controllers/SalidaInsumos/crearSalida');
const listarSalidaController = require('../controllers/SalidaInsumos/obtenerSalidas');
const cambiarEstadoController = require('../controllers/SalidaInsumos/cambiarEstado');

// Ruta para crear una nueva salida
router.post('/salidasInsumos', salidaController.crearSalida);

// Ruta para obtener todas las salidas
router.get('/ListarSalidas', listarSalidaController.obtenerSalidas);

// Ruta para cambiar el estado de una salida
router.patch('/salidas/:idSalida', cambiarEstadoController.cambiarEstado);

module.exports = router;
