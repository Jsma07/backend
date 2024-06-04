const Ventas = require('../../Models/ventas');

async function ListarVentas(req, res) {
    try {
        const listaVentas = await Ventas.findAll();
        res.json(listaVentas);
    } catch (error) {
        console.error("Ocurrió un error al listar las ventas:", error);
        res.status(500).json({ error: 'Hubo un error al procesar la solicitud' });
    }
}

module.exports = {
    ListarVentas,
};
