const express = require('express');
const router = express.Router();
const controladorUsuario = require("../controllers/userController")

router.get('/api/users', controladorUsuario.getAllUsers);

module.exports = router
