const express = require('express');
const router = express.Router();
const Empleadocontroller = require("../controllers/Empleadocontroller")


router.get('/jackenail/Listar_Empleados', async (req, res) => {
    try {
        const ventas = await Empleadocontroller.Listar_Empleados();
        res.json(ventas);
    } catch (error) {
        res.status(500).json({ message: 'Error al listar los clietnes' });
    }
});


router.post('/Jackenail/RegistrarEmpleados', async (req, res) => {
    const DatosCrearEmpleados = req.body;

    try {
        const resultadoCrearEmpleados = await Empleadocontroller.CrearEmpleados(DatosCrearEmpleados);
        res.status(201).json({ message: 'Crear Empleados creado correctamente', IdEmpleado: resultadoCrearEmpleados });
    } catch (error) {
        console.error("Error al crear cliente:", error);
        res.status(500).json({ message: 'Error al crear Empleados' });
    }
});


module.exports = router
