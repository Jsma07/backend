const express = require('express');
const routes = express.Router();
const listarServicios = require('../controllers/Servicios/listarServiciosController');
const crearServicio = require('../controllers/Servicios/crearServicioController');
const editarServicio = require('../controllers/Servicios/editarServicioController');

routes.get('/api/servicios', listarServicios.listarServicios);
routes.post('/api/servicios/guardarServicio', crearServicio.guardarServicio);
routes.put('/api/servicios/editar/:IdServicio', editarServicio.editarServicio);

module.exports = routes;