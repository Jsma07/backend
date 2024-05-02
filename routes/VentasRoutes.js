// ventasRoute.js
const express = require('express');
const router = express.Router();
const ventasController = require("../controllers/VentasController");


router.post('/Jackenail/RegistrarVentas', async (req, res) => {
    const DatosVentas = req.body;

    try {
        const nuevaVentaId = await ventasController.CrearVentas(DatosVentas);
        res.status(201).json({ message: 'Venta creada correctamente', idVenta: nuevaVentaId });
    } catch (error) {
        console.error("Error al crear venta:", error);
        res.status(500).json({ message: 'Error al crear venta' });
    }
});



router.get('/Jackenail/Ventas', async (req, res) => {
    try {
        const ventas = await ventasController.Listar_Ventas();
        res.json(ventas);
    } catch (error) {
        res.status(500).json({ message: 'Error al listar ventas' });
    }
});

router.put('/Jackenail/Ventas/:id', async (req, res) => {
    const idventa = req.params.id;
    const nuevoEstado = req.body.estado;

    try {
        const resultadoVenta = await ventasController.Anular(idventa, nuevoEstado);
        res.json({ message: 'Venta anulada correctamente', resultadoVenta });
    } catch (error) {
        res.status(500).json({ message: 'Error al anular venta' });
    }
});

module.exports = router;
