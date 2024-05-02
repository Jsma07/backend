const express = require('express');
const router = express.Router();
const listarUsuario = require("../controllers/Usuarios/listarUsuarioController");
const  crearUsuario  = require("../controllers/Usuarios/crearUsuarioController"); // Importa la función crearUsuario del controlador
const editarUsuario = require('../controllers/Usuarios/editarUsuarioController');
router.get('/api/users', listarUsuario.getAllUsers);
router.post('/api/crearUsuario', crearUsuario.crearUsuario);
router.put('/api/editarUsuario/:id', editarUsuario.editarUsuario) // Usa la función crearUsuario en lugar de guardarUsuario.crearUsuario
router.get('/api/verificarCorreo/:correo', crearUsuario.verificarCorreo)
module.exports = router;
const listarUsuario = require("../controllers/Usuarios/listarUsuarioController")

router.get('/api/users', listarUsuario.getAllUsers);

module.exports = router
