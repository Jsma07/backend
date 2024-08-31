const express = require('express');
const router = express.Router();

const listarServicio = require("../controllers/Agendamiento/Servicio/listarServicioController");
const crearServicio = require("../controllers/Agendamiento/Servicio/crearServicioController");
const editarServicio = require("../controllers/Agendamiento/Servicio/EditarServicioController");

router.get('/api/service' , listarServicio.getAllService);
router.post('/api/createService', crearServicio.crearServicio);
router.put('/api/editarService/:id', editarServicio.editarServicio)
module.exports = router;