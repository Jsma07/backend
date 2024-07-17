const Compra = require('../../models/compras');
const DetalleCompra = require('../../models/detallecompra');
const Insumo = require('../../models/insumos');

exports.guardarCompra = async (req, res) => {
    try {
        const { fecha_compra, descuento_compra, iva_compra, estado_compra, detallesCompra } = req.body;

        let totalValorInsumos = 0;

        const detallesCompraGuardados = await Promise.all(detallesCompra.map(async detalle => {

            let insumoExistente = await Insumo.findOne({ where: { NombreInsumos: detalle.Dnombre_insumo } });

            if (insumoExistente) {
                insumoExistente.Cantidad += detalle.cantidad_insumo;
                insumoExistente.Estado = insumoExistente.Cantidad > 0 ? 'Disponible' : 'Terminada';
                await insumoExistente.save();

            } else {
                insumoExistente = await Insumo.create({
                    IdCategoria: detalle.IdCategoria,
                    Imagen: detalle.Dimagen_insumo,
                    NombreInsumos: detalle.Dnombre_insumo,
                    Cantidad: detalle.cantidad_insumo,
                    UsosDisponibles: 0,
                    Estado: detalle.cantidad_insumo > 0 ? 'Disponible' : 'Terminada'
                });
            }

            const valorInsumo = detalle.precio_unitario * detalle.cantidad_insumo;
            totalValorInsumos += valorInsumo;

            const nuevoDetalleCompra = await DetalleCompra.create({
                IdCompra: nuevaCompra.IdCompra,
                IdProveedor: detalle.IdProveedor,
                IdCategoria: detalle.IdCategoria,
                Dimagen_insumo: detalle.Dimagen_insumo,
                Dnombre_insumo: detalle.Dnombre_insumo,
                precio_unitario: detalle.precio_unitario,
                cantidad_insumo: detalle.cantidad_insumo,
                totalValorInsumos: valorInsumo
            });

            return nuevoDetalleCompra;
        }));

        const subtotal_compra = totalValorInsumos - descuento_compra + iva_compra;

        const nuevaCompra = await Compra.create({
            fecha_compra,
            descuento_compra,
            iva_compra,
            subtotal_compra,
            estado_compra
        });

        res.status(200).json({
            estado: 'Compra y detalle de compra guardados correctamente',
            compra: nuevaCompra,
            detallesCompra: detallesCompraGuardados
        });
    } catch (error) {
        console.error("Error al guardar la compra", error);
        res.status(500).json({ error: 'Error al guardar la compra' });
    }
}
