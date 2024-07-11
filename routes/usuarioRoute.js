const express = require('express');
const router = express.Router();
const authorize = require('../middleware/auth')
const listarUsuario = require("../controllers/Usuarios/listarUsuarioController");
const  crearUsuario  = require("../controllers/Usuarios/crearUsuarioController"); // Importa la función crearUsuario del controlador
const editarUsuario = require('../controllers/Usuarios/editarUsuarioController');
router.get('/api/users', authorize(['Administradores']), listarUsuario.getAllUsers);
router.post('/api/crearUsuario',authorize(['Administradores']), crearUsuario.crearUsuario);
router.put('/api/editarUsuario/:id',authorize(['Administradores']), editarUsuario.editarUsuario) // Usa la función crearUsuario en lugar de guardarUsuario.crearUsuario
router.get('/api/verificarCorreo/:correo',authorize(['Administradores']), crearUsuario.verificarCorreo)
router.put('/api/actualizarContrasena/:id',authorize(['Administradores']), editarUsuario.actualizarContrasena);


module.exports = router;


