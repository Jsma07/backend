const express = require('express');
const router = express.Router();
const { ListarVentas } = require('../controllers/Ventas/ListarVentas');
const { registrarVenta } = require('../controllers/Ventas/Registrarventas');
const { cambiarEstadoVenta } = require('../controllers/Ventas/cambiarEstado'); 
router.get('/Jackenail/Listarventas', ListarVentas);

router.post('/Jackenail/RegistrarVenta', registrarVenta);

router.put('/Jackenail/CambiarEstado/:idVenta', cambiarEstadoVenta);
module.exports = router;
