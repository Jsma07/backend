const express = require('express');
const routes = express.Router();
const listarCategorias = require('../controllers/Insumos/listarCategoriaController');
const crearCategoria = require('../controllers/Insumos/crearCategoriaController');
const editarCategoria = require('../controllers/Insumos/editarCategoriaController');

routes.get('/api/categorias', listarCategorias.listarCategorias);
routes.post('/api/categorias/guardarCategoria', crearCategoria.guardarCategoria);
routes.put('/api/categorias/editar/:IdCategoria', editarCategoria.editarCategoria);


module.exports = routes;