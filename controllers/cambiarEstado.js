const Ventas = require('../../Models/ventas');


async function cambiarEstadoVenta(req, res) {
    const idVenta = req.params.idVenta; 
    const nuevoEstado = req.body.Estado;

    try {
        const venta = await Ventas.findByPk(idVenta);
        if (!venta) {
            throw new Error('La venta no fue encontrada');
        }
        venta.Estado = nuevoEstado;
        await venta.save();
        res.json(venta); // Devolver la venta actualizada como respuesta
    } catch (error) {
        console.error("Ocurrió un error al cambiar el estado de la venta:", error);
        res.status(500).json({ error: 'Hubo un error al procesar la solicitud' });
    }
}

module.exports = {
    cambiarEstadoVenta
};



module.exports = {
    cambiarEstadoVenta
};