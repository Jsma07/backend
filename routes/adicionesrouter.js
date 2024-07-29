const express = require('express');
const router = express.Router();
const authorize = require('../middleware/auth')

const { listarAdiciones,cambiarEstadoAdicion } = require('../controllers/Adiciones/listarAdiciones');
const { registrarAdicion } = require('../controllers/Adiciones/registrarAdicion');
router.get('/Jackenail/Listarventas/adiciones', listarAdiciones);

router.post('/Jackenail/Registraradiciones', registrarAdicion);

router.put('/Jackenail/CambiaEstado/:adiciones', cambiarEstadoAdicion);
module.exports = router;
