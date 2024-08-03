const Compra = require('../../Models/compras');
const DetalleCompra = require('../../Models/detallecompra');
const Insumo = require('../../Models/insumos');

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
                    
                    if (insumo.Cantidad <= 0) {
                        insumo.Cantidad = 0;
                    }

                    insumo.Estado = insumo.Cantidad > 0 ? 'Disponible' : 'Terminado';
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
