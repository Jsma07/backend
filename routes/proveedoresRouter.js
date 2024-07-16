const express = require('express');
const routes = express.Router();
const authorize = require('../middleware/auth')
const listarProveedores = require('../controllers/Compras/Proveedores/listarProveedoresController');
const crearProveedor = require('../controllers/Compras/Proveedores/crearProveedorController');
const editarProveedor = require('../controllers/Compras/Proveedores/editarProveedorController');
const validacionesController = require('../controllers/Compras/Proveedores/validacionesController');

routes.get('/api/proveedores', authorize(['Proveedores']), listarProveedores.listarProveedores);
routes.post('/api/proveedores/guardarProveedor', authorize(['Proveedores']), crearProveedor.guardarProveedor);
routes.put('/api/proveedores/editar/:IdProveedor', authorize(['Proveedores']), editarProveedor.editarProveedor);
routes.get('/api/proveedores/validacionCorreo/:correo', authorize(['Proveedores']), validacionesController.verificarCorreoProveedor);

module.exports = routes;
