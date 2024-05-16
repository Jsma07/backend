const express = require('express');
const router = express.Router();
const controladorRol = require("../controllers/rolController")

router.get('/api/roles', controladorRol.getAllRoles);

module.exports = router