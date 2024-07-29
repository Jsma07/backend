const express = require('express');
const router = express.Router();
const authorize = require('../middleware/auth')
const listarUsuario = require("../controllers/Usuarios/listarUsuarioController");
const  crearUsuario  = require("../controllers/Usuarios/crearUsuarioController"); // Importa la función crearUsuario del controlador
const editarUsuario = require('../controllers/Usuarios/editarUsuarioController');
router.get('/api/users', authorize(['Usuarios']), listarUsuario.getAllUsers);
router.post('/api/crearUsuario',authorize(['Usuarios']), crearUsuario.crearUsuario);
router.put('/api/editarUsuario/:id',authorize(['Usuarios']), editarUsuario.editarUsuario) // Usa la función crearUsuario en lugar de guardarUsuario.crearUsuario
router.get('/api/verificarCorreo/:correo', crearUsuario.verificarCorreo)
router.get('/api/verificarDocumento/:documento', crearUsuario.verificarDocumento)
router.put('/api/actualizarContrasena/:id',authorize(['Usuarios']), editarUsuario.actualizarContrasena);
router.get('/api/usuario',authorize([]),listarUsuario.getUser);


module.exports = router;


