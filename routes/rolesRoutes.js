const express = require('express');
const router = express.Router();
const listarRol = require("../controllers/Roles/rolController")
const crearRol = require('../controllers/Roles/crearRolController')
const {editarRol , traerRol} = require('../controllers/Roles/editarRolController')
const permisos = require('../controllers/permisos/listarPermisos')

router.get('/api/roles', listarRol.listarRoles);
router.post('/api/roles/crearRol', crearRol.crearRol);
router.get('/api/permisos', permisos.listarPermisos)
router.put('/api/editarRol/:id', editarRol)
router.get('/api/rol/:id', traerRol)
module.exports = router;
