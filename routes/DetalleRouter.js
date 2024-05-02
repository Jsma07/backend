// ventasRoute.js
const express = require('express');
const router = express.Router();
const DetalleVentasControllers = require("../controllers/DetalleController");


router.post('/Jackenail/RegistrarDetalle', async (req, res) => {
    const DetalleVentas = req.body;
    try {
        // Llamamos a la función Creardetalleventas del controlador para registrar el detalle de ventas
        const detalle = await DetalleVentasControllers.Creardetalleventas(DetalleVentas);
        // Si la operación es exitosa, respondemos con un estado 201 y el detalle de la venta registrado
        res.status(201).json({ message: 'Detalle de ventas registrado correctamente', idDetalle: detalle });
    } catch (error) {
        // Si hay un error, respondemos con un estado 500 y un mensaje de error
        console.error("Error al crear venta:", error);
        res.status(500).json({ message: 'Error al registrar el detalle de ventas' });
    }
});


router.get('/jackenail/Detalleventas', async (req, res) => {
    try {
        const detalle = await DetalleVentasControllers.DetalleVentas();
        res.json(detalle);
    } catch (error) {
        res.status(500).json({ message: 'Error al listar detalle' });
    }

});

module.exports = router
