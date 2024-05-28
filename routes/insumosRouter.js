const express = require('express');
const routes = express.Router();
const listarInsumos = require('../controllers/Insumos/listarInsumoController');
const crearInsumo = require('../controllers/Insumos/crearInsumoController');
const editarInsumo = require('../controllers/Insumos/editarInsumoController');

routes.get('/api/insumos', listarInsumos.listarInsumos);
routes.post('/api/insumos/guardarInsumo', crearInsumo.guardarInsumo);
routes.put('/api/insumos/editar/:IdInsumos', editarInsumo.editarInsumo);

module.exports = routes;