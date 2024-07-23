const express = require('express');
const routes = express.Router();
const listarCompras = require('../controllers/Compras/listarComprasController');
const crearCompra = require('../controllers/Compras/creaarCompraController');
const AnularCompra = require('../controllers/Compras/AnularCompraController')

routes.get('/api/compras', listarCompras.listarCompras);
routes.post('/api/compras/guardarCompra', crearCompra.guardarCompra);
routes.put('/api/compras/Anular/:id', AnularCompra.anularCompra);

module.exports = routes;