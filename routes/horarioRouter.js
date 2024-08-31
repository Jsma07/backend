const express = require('express');
const router = express.Router();
const {
    crearHorario,
    obtenerHorarios,
    actualizarHorario,
    eliminarHorario,
    inactivarHoras,
    listarHorasInactivas,
    eliminarHorasInactivas,
    listarFechasConHorasInactivas // Nueva ruta
} = require('../controllers/Agendamiento/Horarios/horariosControllers');

router.get('/api/horarios', obtenerHorarios);
router.post('/api/horarios/crear', crearHorario);
router.put('/api/horarios/:id', actualizarHorario);
router.delete('/api/horarios/:id', eliminarHorario);
router.get('/api/horarios/listarHorasInactivas/:fecha', listarHorasInactivas);
router.post('/api/horarios/inactivarHoras', inactivarHoras);
router.post('/api/horarios/eliminarHorasInactivas', eliminarHorasInactivas);
router.get('/api/horarios/listarFechasConHorasInactivas', listarFechasConHorasInactivas); // Nueva ruta

module.exports = router;