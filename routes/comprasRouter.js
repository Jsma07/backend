const express = require('express');
const routes = express.Router();
const listarCompras = require('../controllers/Compras/listarComprasController');
const crearCompra = require('../controllers/Compras/creaarCompraController');
const AnularCompra = require('../controllers/Compras/AnularCompraController');
const CambiarEstadoCompra = require('../controllers/Compras/editarCompraController');

routes.get('/api/compras', listarCompras.listarCompras);
routes.post('/api/compras/guardarCompra', crearCompra.guardarCompra);
routes.put('/api/compras/Anular/:id', AnularCompra.anularCompra);
routes.put('/api/compras/cambiarEstado/:IdCompra', CambiarEstadoCompra.editarEstadoCompra);

module.exports = routes;