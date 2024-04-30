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



module.exports = router
