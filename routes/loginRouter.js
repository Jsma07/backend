const express = require('express');
const router = express.Router();
const {Login} = require('../controllers/Login/Login')

router.post('/api/iniciarSesion', Login);

module.exports = router;
