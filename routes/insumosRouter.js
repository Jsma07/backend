// routes/insumosRouter.js

const express = require('express');
const router = express.Router();

const listarInsumos = require('../controllers/Insumos/listarInsumoController');
const crearInsumo = require('../controllers/Insumos/crearInsumoController');
const editarInsumo = require('../controllers/Insumos/editarInsumoController').editarInsumo;
const existenciasEditar = require('../controllers/Insumos/editarInsumoController').existenciaseditar; // Cambiado para usar el controlador correcto

<<<<<<< HEAD
routes.get('/api/insumos', listarInsumos.listarInsumos);
routes.post('/api/insumos/guardarInsumo', crearInsumo.guardarInsumo);
routes.put('/api/insumos/editar/:IdInsumos', editarInsumo.editarInsumo);
routes.put('/api/existenciainsumos/editar/:IdInsumos', editarInsumo.existenciaseditar);
existenciaseditar
module.exports = routes;
=======
// Rutas para insumos
router.get('/api/insumos', listarInsumos.listarInsumos);
router.post('/api/insumos/guardarInsumo', crearInsumo.guardarInsumo);
router.put('/api/insumos/editar/:IdInsumos', editarInsumo); // Usar el controlador 'editarInsumo' para esta ruta
router.put('/api/existenciainsumos/editar/:IdInsumos', existenciasEditar); // Usar el controlador 'existenciaseditar' para esta ruta

module.exports = router;
>>>>>>> 4634cb1a2d085458c9e2703246c0108a96702259
