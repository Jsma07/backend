const express = require('express');
const router = express.Router();
const listarUsuario = require("../controllers/Usuarios/listarUsuarioController")

router.get('/api/users', listarUsuario.getAllUsers);

module.exports = router
