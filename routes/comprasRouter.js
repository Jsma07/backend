const express = require('express');
const routes = express.Router();
const listarCompras = require('../controllers/Compras/listarComprasController');
// const crearInsumo = require('../controllers/Insumos/crearInsumoController');
// const editarInsumo = require('../controllers/Insumos/editarInsumoController');

routes.get('/api/compras', listarCompras.listarCompras);
// routes.post('/api/insumos/guardarInsumo', crearInsumo.guardarInsumo);
// routes.put('/api/insumos/editar/:IdInsumos', editarInsumo.editarInsumo);

module.exports = routes;