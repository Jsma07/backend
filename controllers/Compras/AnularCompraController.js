const Compra = require('../../models/compras');
const DetalleCompra = require('../../models/detallecompra');
const Insumo = require('../../models/insumos');

exports.anularCompra = async (req, res) => {
    const { id } = req.params; 
    try {
        const compra = await Compra.findByPk(id);

        if (!compra) {
            return res.status(404).json({ error: `Compra con ID ${id} no encontrada` });
        }

        compra.estado_compra = 'Anulada';
        await compra.save();

        const detallesCompra = await DetalleCompra.findAll({
            where: { IdCompra: id }
        });

        if (detallesCompra.length > 0) {
            await Promise.all(detallesCompra.map(async detalle => {
                const insumo = await Insumo.findByPk(detalle.IdInsumo);
                if (insumo) {
                    insumo.Cantidad -= detalle.cantidad_insumo;
                    insumo.Estado = insumo.Cantidad > 0 ? 'Disponible' : 'Terminada';
                    await insumo.save();
                }
            }));
        }

        res.status(200).json({
            message: `Compra con ID ${id} anulada exitosamente`,
            compra: compra
        });
    } catch (error) {
        console.error('Error al anular la compra:', error);
        res.status(500).json({ error: 'Error al anular la compra' });
    }
};
