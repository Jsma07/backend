const express = require('express');
const routes = express.Router();
const categoriasController = require('../controllers/Insumos/categoriasController');

routes.get('/api/categorias', categoriasController.listarCategorias);
routes.get('/api/categorias/:idCategoria', categoriasController.obtenerCategoriaPorId);
routes.put('/api/categorias/editar', categoriasController.editarCategoria);
routes.post('/api/categorias/guardarCategoria', categoriasController.guardarCategoria);


module.exports = routes;