const express = require('express');
const router = express.Router();
const authorize = require('../middleware/auth');

router.get('/user', authorize([]), (req, res) => {
  res.json({
    usuario: req.userData
  });
});

module.exports = router;
