const express = require('express');
const router = express.Router();

const listarAgendas = require('../controllers/Agendamiento/listarAgendasController');
const crearAgenda = require('../controllers/Agendamiento/crearAgendaController');
const editarAgenda = require('../controllers/Agendamiento/editarAgendaController');

router.get('/api/agendas', listarAgendas.listarAgendamientos);
router.post('/api/agendas/crearAgenda', crearAgenda.crearAgendamiento )

module.exports = router;


