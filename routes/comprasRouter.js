const express = require('express');
const routes = express.Router();
const listarCompras = require('../controllers/Compras/listarComprasController');
const crearCompra = require('../controllers/Compras/creaarCompraController');
// const editarInsumo = require('../controllers/Insumos/editarInsumoController');

routes.get('/api/compras', listarCompras.listarCompras);
routes.post('/api/compras/guardarCompra', crearCompra.guardarCompra);
// routes.put('/api/insumos/editar/:IdInsumos', editarInsumo.editarInsumo);

module.exports = routes;