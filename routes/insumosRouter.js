const express = require('express');
const listarInsumos = require('../controllers/Insumos/listarInsumoController');
const crearInsumo = require('../controllers/Insumos/crearInsumoController');
const editarInsumo = require('../controllers/Insumos/editarInsumoController');

module.exports = (uploadInsumos) => {
  const router = express.Router();

  router.get('/api/insumos', listarInsumos.listarInsumos);
  router.post('/api/insumos/guardarInsumo', uploadInsumos.single('Imagen'), crearInsumo.guardarInsumo);
  router.put('/api/insumos/editar/:IdInsumos', uploadInsumos.single('Imagen'),  editarInsumo.editarInsumo);

  return router;
};
