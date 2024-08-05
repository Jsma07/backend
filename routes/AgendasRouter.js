const express = require('express');
const router = express.Router();

const listarAgendas = require('../controllers/Agendamiento/listarAgendasController');
const crearAgenda = require('../controllers/Agendamiento/crearAgendaController');
const editarAgenda = require('../controllers/Agendamiento/editarAgendaController'); // Añadir el controlador de edición
const { obtenerHorasDisponibles, obtenerHorasOcupadas } = require('../controllers/Agendamiento/horasController');
const AnularAgenda = require('../controllers/Agendamiento/anularAgendaController');

router.get('/api/agendas', listarAgendas.listarAgendamientos);
router.post('/api/agendas/crearAgenda', crearAgenda.crearAgendamiento);
router.put('/api/agendas/editar/:id', editarAgenda.editarAgendamiento); // Añadir la ruta de edición
router.get('/api/agendas/horasOcupadas', obtenerHorasOcupadas);
router.get('/api/agendas/horasDisponibles', obtenerHorasDisponibles);
router.put('/api/agendas/anular/:id', AnularAgenda);

module.exports = router;
