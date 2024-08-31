    const express = require('express');
    const router = express.Router();
    const authorize = require('../middleware/auth');


    const listarAgendas = require('../controllers/Agendamiento/listarAgendasController');
    const crearAgenda = require('../controllers/Agendamiento/crearAgendaController');
    const editarAgenda = require('../controllers/Agendamiento/editarAgendaController'); // Añadir el controlador de edición
    const {  obtenerHorasOcupadas } = require('../controllers/Agendamiento/horasController');
    const AnularAgenda = require('../controllers/Agendamiento/anularAgendaController');
    const {misCitas} = require('../controllers/Agendamiento/misCitas')
    router.get('/api/agendas',   listarAgendas.listarAgendamientos);
    router.post('/api/agendas/crearAgenda',authorize([]), crearAgenda.crearAgendamiento);
    router.put('/api/agendas/editar/:id', editarAgenda.editarAgendamiento); // Añadir la ruta de edición
    router.get('/api/agendas/horasOcupadas', obtenerHorasOcupadas);
    router.put('/api/agendas/anular/:id', AnularAgenda);
    router.get('/api/agendas/misCitas',authorize([]), misCitas);

    
    module.exports = router;
