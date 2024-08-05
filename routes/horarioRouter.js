const express = require('express');
const router = express.Router();
const { crearHorario, obtenerHorarios, actualizarHorario } = require('../controllers/Agendamiento/Horarios/horariosControllers');

router.get('/api/horarios', obtenerHorarios);
router.post('/api/horarios/crear', crearHorario);
router.put('/api/horarios/:id', actualizarHorario); // Corrige el nombre del parámetro en la ruta

module.exports = router;
