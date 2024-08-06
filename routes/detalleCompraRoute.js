const express = require('express');
const routes = express.Router();
const { listarDetalleCompras, BuscarDetalleCompraPorId } = require('../controllers/Compras/DetalleCompra/listarDetalleCompraController');
const CrearDetalleCompra = require('../controllers/Compras/DetalleCompra/CrearDetalleCompraController');

routes.get('/api/detallecompras', listarDetalleCompras);
routes.post('/api/detallecompras/guardarDetalleCompra', CrearDetalleCompra.registrarDetalleCompra);
routes.get('/api/detallecompras/:id', BuscarDetalleCompraPorId);


module.exports = routes;