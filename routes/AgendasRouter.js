const express = require('express');
const router = express.Router();

const listarAgendas = require('../controllers/Agendamiento/listarAgendasController');
const crearAgenda = require('../controllers/Agendamiento/crearAgendaController');
const { obtenerHorasDisponibles, obtenerHorasOcupadas } = require('../controllers/Agendamiento/horasController');

router.get('/api/agendas', listarAgendas.listarAgendamientos);
router.post('/api/agendas/crearAgenda', crearAgenda.crearAgendamiento);
router.get('/api/agendas/horasOcupadas', obtenerHorasOcupadas);
router.get('/api/agendas/horasDisponibles', obtenerHorasDisponibles);

module.exports = router;
