const express = require('express');
const listarInsumos = require('../controllers/Insumos/listarInsumoController');
const crearInsumo = require('../controllers/Insumos/crearInsumoController');
const editarInsumo = require('../controllers/Insumos/editarInsumoController');
const existenciaseditar = require('../controllers/Insumos/editarInsumoController');

routes.get('/api/insumos', listarInsumos.listarInsumos);
routes.post('/api/insumos/guardarInsumo', crearInsumo.guardarInsumo);
routes.put('/api/insumos/editar/:IdInsumos', editarInsumo.editarInsumo);
routes.put('/api/existenciainsumos/editar/:IdInsumos', editarInsumo.existenciaseditar);
existenciaseditar
module.exports = routes;