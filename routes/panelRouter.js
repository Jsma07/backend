const express = require('express');
const routes = express.Router();
const { contarClientes, contarVentas, contarCompras, contarServicios } = require('../controllers/Panel/usuariosTotalesController');

routes.get('/api/totalclientes', contarClientes);
routes.get('/api/totalventas', contarVentas);
routes.get('/api/totalcompras', contarCompras);
routes.get('/api/totalservicios', contarServicios);

module.exports = routes;
