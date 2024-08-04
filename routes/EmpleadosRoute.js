
const express = require('express');
const router = express.Router();
const authorize = require('../middleware/auth')
const Empleadocontroller = require("../controllers/Empleados/Empleadocontroller")
const cambiarContrasena=require("../controllers/Empleados/ContraseñaEmpleado")

router.get('/jackenail/Listar_Empleados', authorize(['Empleados']), async (req, res) => {
    try {
        const ventas = await Empleadocontroller.Listar_Empleados();
        res.json(ventas);
    } catch (error) {
        res.status(500).json({ message: 'Error al listar los empleados' });
    }
});


router.post('/Jackenail/RegistrarEmpleados',authorize(['Empleados']), (req, res) => {
    const datosCrearEmpleados = req.body;
    Empleadocontroller.CrearEmpleados(datosCrearEmpleados, res);
});


router.put("/Jackenail/Empleado/:id", cambiarContrasena);



router.put('/Jackenail/ActualizarEmpleados/:id',authorize(['Empleados']), async (req, res) => {
    const idEmpleado = req.params.id;
    const datosActualizarEmpleado = req.body;

    try {
        const resultadoActualizarEmpleado = await Empleadocontroller.ActualizarEmpleado(idEmpleado, datosActualizarEmpleado);
        res.json({ message: 'Empleado actualizado correctamente', idEmpleado: resultadoActualizarEmpleado });
    } catch (error) {
        console.error("Error al actualizar empleado:", error);
        res.status(500).json({ message: 'Error al actualizar Empleados' });
    }
});

router.put('/Jackenail/CambiarEstadoEmpleado/:id',authorize(['Empleados']), async (req, res) => {
    const idEmpleado = req.params.id;
    const nuevoEstado = req.body.Estado; // Suponiendo que 'estado' es el campo que contiene el nuevo estado en tu solicitud

    try {
        const idEmpleadoActualizado = await Empleadocontroller.cambiarEstadoEmpleado(idEmpleado, nuevoEstado);
        res.json({ message: 'Estado del empleado actualizado correctamente', idEmpleado: idEmpleadoActualizado });
    } catch (error) {
        console.error("Error al cambiar el estado del empleado:", error);
        res.status(500).json({ message: 'Error al cambiar el estado del empleado' });
    }
});


module.exports = router
