const express = require('express');
const routes = express.Router();
const listarProveedores = require('../controllers/Compras/Proveedores/listarProveedoresController');
const crearProveedor = require('../controllers/Compras/Proveedores/crearProveedorController');
const editarProveedor = require('../controllers/Compras/Proveedores/editarProveedorController');
const validacionesController = require('../controllers/Compras/Proveedores/validacionesController');

routes.get('/api/proveedores', listarProveedores.listarProveedores);
routes.post('/api/proveedores/guardarProveedor', crearProveedor.guardarProveedor);
routes.put('/api/proveedores/editar/:IdProveedor', editarProveedor.editarProveedor);
routes.get('/api/proveedores/validacionCorreo/:correo', validacionesController.verificarCorreoProveedor);

module.exports = routes;
