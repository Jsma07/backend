const express = require('express');
const router = express.Router();
const { registrarDetalleVenta } = require('../controllers/Ventas/Detalle/Registrar');


router.post('/Jackenail/Detalleregistrar', registrarDetalleVenta);

module.exports = router;
