const express = require('express');
const router = express.Router();
const listarUsuario = require("../controllers/Usuarios/listarUsuarioController")
const guardarUsuario = require("../controllers/Usuarios/crearUsuarioController")

router.get('/api/users', listarUsuario.getAllUsers);
router.post('/api/crearUsuario', guardarUsuario.crearUsuario);
module.exports = router
