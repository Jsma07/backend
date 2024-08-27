const express = require('express');
// const authorize = require('../middleware/auth')
const listarServicios = require('../controllers/Servicios/listarServiciosController');
const crearServicio = require('../controllers/Servicios/crearServicioController');
const editarServicio = require('../controllers/Servicios/editarServicioController');

module.exports = (upload) => {
    const routes = express.Router();

    routes.get('/api/servicios',  listarServicios.listarServicios);
    routes.post('/api/servicios/guardarServicio', upload.single('ImgServicio'), crearServicio.guardarServicio);
    routes.put('/api/servicios/editar/:IdServicio',  upload.single('ImgServicio'), editarServicio.editarServicio);

    return routes;
};
