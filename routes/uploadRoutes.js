// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const servicioController = require('../controllers/Servicios/crearServicioController');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   }
// });

// const upload = multer({ storage });

// router.post('/guardarServicio', upload.single('ImgServicio'), servicioController.guardarServicio);

// module.exports = router;
