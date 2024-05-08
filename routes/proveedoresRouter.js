const express = require('express');
const routes = express.Router();
const proveedoresController = require('../controllers/Compras/Proveedores/proveedoresController');
const validacionesController = require('../controllers/Compras/Proveedores/validacionesController');

routes.get('/api/proveedores', proveedoresController.listarProveedores);
routes.get('/api/proveedores/:idProveedor', proveedoresController.obtenerProveedorPorId);
routes.put('/api/proveedores/editar', proveedoresController.editarProveedor);
routes.post('/api/proveedores/guardarProveedor', proveedoresController.guardarProveedor);
routes.post('/api/proveedores/validacionCorreo', validacionesController.validarCorreoProveedor);
routes.post('/api/proveedores/validacionEmpresa', validacionesController.validarEmpresaProveedor);

module.exports = routes;
