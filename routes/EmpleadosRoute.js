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

router.put('/Jackenail/ActualizarEmpleados/:id', async (req, res) => {
    const idEmpleado = req.params.id;
    const DatosActualizarEmpleados = req.body;
    try{
        const ResultadosEmpleados=await Empleadocontroller.ActualizarEmpleado( idEmpleado, DatosActualizarEmpleados);
        res.json({ message:'Empleado actualizado  correctamente', ResultadosEmpleados});
    }catch(error){
        console.error("Error al actualizar Empleados:", error);
        res.status(500).json({ message: 'Error al actualizar Empleados' });
    }
});
router.delete('/Jackenail/EliminarEmpleado/:id', async (req, res) => { 
    const idEmpleado = req.params.id; // Obteniendo el ID del empleado de los parámetros de la URL
    try {
        const filasEliminadas = await Empleadocontroller.EliminarEmpleado(idEmpleado); // Llamando a la función EliminarEmpleado con el ID del empleado
        res.json({ message: 'Empleado eliminado correctamente', filasEliminadas });
    } catch (error) {
        console.error("Error al eliminar empleado:", error);
        res.status(500).json({ message: 'Error al eliminar empleado' });
    }  
});


module.exports = router
