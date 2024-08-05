const express = require('express');
const router = express.Router();
const { crearHorario, obtenerHorarios, actualizarHorario, eliminarHorario } = require('../controllers/Agendamiento/Horarios/horariosControllers');

router.get('/api/horarios', obtenerHorarios);
router.post('/api/horarios/crear', crearHorario);
router.put('/api/horarios/:id', actualizarHorario);
router.delete('/api/eliminarHorarios/:id', eliminarHorario); // Ruta para eliminar un horario

module.exports = router;
