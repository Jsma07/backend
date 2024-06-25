// routes/insumosRouter.js

const express = require('express');
const router = express.Router();

// Importar los controladores
const listarInsumos = require('../controllers/Insumos/listarInsumoController');
const crearInsumo = require('../controllers/Insumos/crearInsumoController');
const editarInsumo = require('../controllers/Insumos/editarInsumoController').editarInsumo;
const existenciasEditar = require('../controllers/Insumos/editarInsumoController').existenciaseditar;

// Se espera que multer se haya pasado al importar este módulo en app.js
module.exports = (uploadInsumos) => {
  // Rutas para insumos
  router.get('/api/insumos', listarInsumos.listarInsumos);
  router.post('/api/insumos/guardarInsumo', uploadInsumos.single('Imagen'), crearInsumo.guardarInsumo); // Usar el middleware de multer para subir imágenes
  router.put('/api/insumos/editar/:IdInsumos', uploadInsumos.single('Imagen'), editarInsumo); // Usar el middleware de multer para subir imágenes
  router.put('/api/existenciainsumos/editar/:IdInsumos', existenciasEditar); // No necesita subir imágenes

  return router;
};
