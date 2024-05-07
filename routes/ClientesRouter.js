const express = require('express');
const router = express.Router();
const ClientesController = require("../controllers/ClientesController")


router.get('/jackenail/Listar_Clientes', async (req, res) => {
    try {
        const ventas = await ClientesController.Listar_Clientes();
        res.json(ventas);
    } catch (error) {
        res.status(500).json({ message: 'Error al listar los clietnes' });
    }

});


router.post('/Jackenail/RegistrarClientes', async (req, res) => {
    const DatosCrearEmpleados = req.body;

    try {
        const resultadoCliente = await ClientesController.Crearclientes(DatosCrearEmpleados);
        res.status(201).json({ message: 'Cliente creado correctamente', IdCliente: resultadoCliente });
    } catch (error) {
        console.error("Error al crear cliente:", error);
        res.status(500).json({ message: 'Error al crear cliente' });
    }
});



router.delete('/Jackenail/EliminarEmpleados/:id', async (req, res) => {
    const idCliente = req.params.id;
    try{
        const Clientess=await ClientesController.ActualizarCliente( idCliente);
        res.json({ message:'Empleado eliminado  correctamente', Clientess});
    }catch(error){
        console.error("Error al eliminar Empleados:", error);
        res.status(500).json({ message: 'Error al eliminar Empleados' });
    }
});

router.put('/Jackenail/Actualizar/:id', async (req, res) => { 
    const idCliente = req.params.id;
    const Datosactualizar = req.body;
    try {
        const Clientess = await ClientesController.ActualizarCliente(idCliente, Datosactualizar);
        res.json({ message: 'Cliente actualizado correctamente', Clientess });
    } catch (error) {
        console.error("Error al actualizar Cliente:", error);
        res.status(500).json({ message: 'Error al actualizar Cliente' });
    }
});

router.put('/Jackenail/ActualizarFotoPerfil/:id', async (req, res) => { 
    const idCliente = req.params.id;
    const nuevaFotoPerfil = req.body.FotoPerfil; 
    try {
        const filasActualizadas = await ClientesController.Actualizarperfilfoto(idCliente, nuevaFotoPerfil);
        res.json({ message: 'Foto de perfil actualizada correctamente', filasActualizadas });
    } catch (error) {
        console.error("Error al actualizar la foto de perfil del cliente:", error);
        res.status(500).json({ message: 'Error al actualizar la foto de perfil del cliente' });
    }
});

router.delete('/Jackenail/EliminarCliente/:id', async (req, res) => { 
    const idCliente = req.params.id;
    try {
        const filasEliminadas = await ClientesController.EliminarCliente(idCliente);
        res.json({ message: 'Cliente eliminado correctamente', filasEliminadas });
    } catch (error) {
        console.error("Error al eliminar cliente:", error);
        res.status(500).json({ message: 'Error al eliminar cliente' });
    }
});




module.exports = router
