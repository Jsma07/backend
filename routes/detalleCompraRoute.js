
const express = require('express');
const routes = express.Router();
const listarDetalleCompras = require('../controllers/Compras/DetalleCompra/listarDetalleCompraController');
//const crearCompra = require('../controllers/Compras/creaarCompraController');
// const editarInsumo = require('../controllers/Insumos/editarInsumoController');

routes.get('/api/detallecompras', listarDetalleCompras.listarDetalleCompras);
//routes.post('/api/compras/guardarCompra', crearCompra.guardarCompra);
// routes.put('/api/insumos/editar/:IdInsumos', editarInsumo.editarInsumo);

module.exports = routes;