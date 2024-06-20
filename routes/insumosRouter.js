// routes/insumosRouter.js

const express = require('express');
const router = express.Router();

const listarInsumos = require('../controllers/Insumos/listarInsumoController');
const crearInsumo = require('../controllers/Insumos/crearInsumoController');
const editarInsumo = require('../controllers/Insumos/editarInsumoController').editarInsumo;
const existenciasEditar = require('../controllers/Insumos/editarInsumoController').existenciaseditar; // Cambiado para usar el controlador correcto

// Rutas para insumos
router.get('/api/insumos', listarInsumos.listarInsumos);
router.post('/api/insumos/guardarInsumo', crearInsumo.guardarInsumo);
router.put('/api/insumos/editar/:IdInsumos', editarInsumo); // Usar el controlador 'editarInsumo' para esta ruta
router.put('/api/existenciainsumos/editar/:IdInsumos', existenciasEditar); // Usar el controlador 'existenciaseditar' para esta ruta

module.exports = router;
