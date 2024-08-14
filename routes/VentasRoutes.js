const express = require('express');
const router = express.Router();
const authorize = require('../middleware/auth')

const { ListarVentas } = require('../controllers/Ventas/ListarVentas');
const { registrarVenta } = require('../controllers/Ventas/Registrarventas');
const { cambiarEstadoVenta } = require('../controllers/Ventas/cambiarEstado'); 

router.get('/Jackenail/Listarventas', ListarVentas);
router.post('/Jackenail/RegistrarVenta',authorize(['Ventas']), registrarVenta);
router.put('/Jackenail/CambiarEstado/:idVenta',authorize(['Ventas']), cambiarEstadoVenta);

module.exports = router;
