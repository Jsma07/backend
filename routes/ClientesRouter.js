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

router.post('/Jackenail/RegistrarClientes', (req, res) => {
    const RegistrarClientes = req.body;
    ClientesController.Crearclientes(RegistrarClientes, res);
});

router.put('/Jackenail/Actualizar/:id', async (req, res) => { 
    const idCliente = req.params.id;
    const datosActualizar = req.body;
    try {
        const clienteActualizadoId = await ClientesController.ActualizarCliente(idCliente, datosActualizar);
        res.json({ message: 'Cliente actualizado correctamente', id: clienteActualizadoId });
    } catch (error) {
        console.error("Error al actualizar Cliente:", error);
        res.status(500).json({ message: 'Error al actualizar Cliente' });
    }
});

router.put('/Jackenail/CambiarEstado/:id', async (req, res) => { 
    const idCliente = parseInt(req.params.id); // Convertir el ID a un número
    const nuevoEstado = req.body.Estado; 

    try {
        const clienteActualizadoId = await ClientesController.cambiarEstadoCliente(idCliente, nuevoEstado);
        if (clienteActualizadoId) {
            res.json({ message: 'Estado del cliente actualizado correctamente', id: clienteActualizadoId });
        } else {
            res.status(404).json({ message: 'Cliente no encontrado' });
        }
    } catch (error) {
        console.error("Error al cambiar el estado del cliente:", error);
        res.status(500).json({ message: 'Error al cambiar el estado del cliente' });
    }
});




module.exports = router