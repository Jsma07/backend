const express = require('express');
const router = express.Router();
const { registrarDetalleVenta } = require('../controllers/Ventas/Detalle/Registrar');
const { ListarDetalleVentas } = require('../controllers/Ventas/Detalle/Listar');
const { BuscarDetalleVentaPorId } = require('../controllers/Ventas/Detalle/Listar'); 

router.post('/Jackenail/Detalleregistrar', registrarDetalleVenta);
router.get('/detallelistar', ListarDetalleVentas);
router.get('/Buscardetalle/:id', BuscarDetalleVentaPorId);

module.exports = router;
