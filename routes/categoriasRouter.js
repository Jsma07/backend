const express = require('express');
const routes = express.Router();
const authorize = require('../middleware/auth')
const listarCategorias = require('../controllers/Insumos/Categorias/listarCategoriaController');
const crearCategoria = require('../controllers/Insumos/Categorias/crearCategoriaController');
const editarCategoria = require('../controllers/Insumos/Categorias/editarCategoriaController');

routes.get('/api/categorias', authorize(['Categorias']), listarCategorias.listarCategorias);
routes.post('/api/categorias/guardarCategoria', authorize(['Categorias']), crearCategoria.guardarCategoria);
routes.put('/api/categorias/editar/:IdCategoria', authorize(['Categorias']), editarCategoria.editarCategoria);

module.exports = routes;