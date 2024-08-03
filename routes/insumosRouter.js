const express = require('express');
const router = express.Router();
const authorize = require('../middleware/auth')
// Importar los controladores
const listarInsumos = require('../controllers/Insumos/listarInsumoController');
const crearInsumo = require('../controllers/Insumos/crearInsumoController');
const editarInsumo = require('../controllers/Insumos/editarInsumoController').editarInsumo;
const existenciasEditar = require('../controllers/Insumos/editarInsumoController').existenciaseditar;

// Se espera que multer se haya pasado al importar este módulo en app.js
module.exports = (uploadInsumos) => {
  // Rutas para insumos
  router.get('/api/insumos', authorize(['Insumos']), listarInsumos.listarInsumos);
  router.post('/api/insumos/guardarInsumo', authorize(['Insumos']), uploadInsumos.single('Imagen'), crearInsumo.guardarInsumo); // Usar el middleware de multer para subir imágenes
  router.put('/api/insumos/editar/:IdInsumos', authorize(['Insumos']), uploadInsumos.single('Imagen'), editarInsumo); // Usar el middleware de multer para subir imágenes

  return router;
};
