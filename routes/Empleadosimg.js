const express = require('express');
const { CrearEmpleados } = require('../controllers/Empleados/Crearempleado');
const router = express.Router();


module.exports=(uploadEmpleados)=>  {

router.post(
  "/Jackenail/crearEmpleadoss",
  uploadEmpleados.single('Img'), CrearEmpleados);
return router;
};