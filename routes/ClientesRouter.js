const express = require('express');
const router = express.Router();
const authorize = require('../middleware/auth')
const ClientesController = require("../controllers/ClientesController")
const {recuperarContrasena } = require('../controllers/contrasena/mailer')

router.post('/api/recuperarContrasena', recuperarContrasena);


router.get('/jackenail/Listar_Clientes', authorize(['Clientes']), async (req, res) => {
    try {
        const ventas = await ClientesController.Listar_Clientes();
        res.json(ventas);
    } catch (error) {
        res.status(500).json({ message: 'Error al listar los clietnes' });
    }

});


router.post('/Jackenail/RegistrarClientes',authorize(['Clientes']), ClientesController.Crearclientes)


router.put('/Jackenail/Actualizar/:id',authorize(['Clientes']), async (req, res) => { 
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

router.put('/Jackenail/CambiarEstado/:id', authorize(['Clientes']), async (req, res) => { 
    const idCliente = req.params.id;
    const nuevoEstado = req.body.Estado; 

    try {
        const clienteActualizadoId = await ClientesController.cambiarEstadoCliente(idCliente, nuevoEstado);
        res.json({ message: 'Estado del cliente actualizado correctamente', id: clienteActualizadoId });
    } catch (error) {
        console.error("Error al cambiar el estado del cliente:", error);
        res.status(500).json({ message: 'Error al cambiar el estado del cliente' });
    }
});







module.exports = router
