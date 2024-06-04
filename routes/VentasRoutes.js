const express = require('express');
const router = express.Router();
const { ListarVentas } = require('../controllers/Ventas/ListarVentas');
const { registrarVenta } = require('../controllers/Ventas/Registrarventas');

// Ruta para listar ventas
router.get('/Jackenail/Listarventas', ListarVentas);

// Ruta para registrar una nueva venta
router.post('/Jackenail/RegistrarVenta', registrarVenta);

module.exports = router;
