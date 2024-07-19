const express = require('express');
const routes = express.Router();
const { listarDetalleCompras, BuscarDetalleCompraPorId } = require('../controllers/Compras/DetalleCompra/listarDetalleCompraController');

routes.get('/api/detallecompras', listarDetalleCompras);
routes.get('/api/detallecompras/:id', BuscarDetalleCompraPorId);

module.exports = routes;