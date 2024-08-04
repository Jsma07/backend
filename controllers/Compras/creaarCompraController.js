const Compra = require('../../Models/compras');
const DetalleCompra = require('../../Models/detallecompra');
const Insumo = require('../../Models/insumos');

exports.guardarCompra = async (req, res) => {
    try {
        const { fecha_compra, descuento_compra, estado_compra, detallesCompra } = req.body;
        console.log("Datos recibidos:", req.body);

        let totalValorInsumos = 0;

        console.log("Detalles de la compra recibidos:", detallesCompra);

        // Validar detallesCompra
        if (!Array.isArray(detallesCompra) || detallesCompra.length === 0) {
            return res.status(400).json({ error: 'Detalles de compra vacíos o inválidos' });
        }

        const detallesCompraGuardados = await Promise.all(detallesCompra.map(async detalle => {
            let insumoExistente = await Insumo.findOne({ where: { IdInsumos: detalle.IdInsumo } });

            if (insumoExistente) {
                insumoExistente.Cantidad += detalle.cantidad_insumo;
                insumoExistente.Estado = insumoExistente.Cantidad > 0 ? 'Disponible' : 'Agotado';
                insumoExistente.PrecioUnitario = detalle.precio_unitario;
                await insumoExistente.save();

                const valorInsumo = detalle.precio_unitario * detalle.cantidad_insumo;
                totalValorInsumos += valorInsumo;

                return {
                    IdInsumo: insumoExistente.IdInsumos,
                    precio_unitario: detalle.precio_unitario,
                    cantidad_insumo: detalle.cantidad_insumo,
                    totalValorInsumos: valorInsumo,
                };
            } else {
                return res.status(400).json({ error: `Insumo con ID ${detalle.IdInsumo} no encontrado` });
            }
        }));

        const iva_compra = 0.19 * totalValorInsumos;
        const total_compra = totalValorInsumos - descuento_compra;
        const subtotal_compra = totalValorInsumos;

        // Crear nueva compra
        const nuevaCompra = await Compra.create({
            fecha_compra,
            descuento_compra,
            iva_compra,
            subtotal_compra,
            total_compra,
            estado_compra
        });

        // Crear detalles de compra
        const detallesCompraGuardadosConId = await Promise.all(detallesCompraGuardados.map(async detalle => {
            const nuevoDetalleCompra = await DetalleCompra.create({
                IdCompra: nuevaCompra.IdCompra,
                IdInsumo: detalle.IdInsumo,
                precio_unitario: detalle.precio_unitario,
                cantidad_insumo: detalle.cantidad_insumo,
                totalValorInsumos: detalle.totalValorInsumos
            });

            return nuevoDetalleCompra;
        }));

        res.status(200).json({
            estado: 'Compra y detalle de compra guardados correctamente',
            compra: nuevaCompra,
            detallesCompra: detallesCompraGuardadosConId
        });
    } catch (error) {
        console.error("Error al guardar la compra", error);
        res.status(500).json({ error: 'Error al guardar la compra' });
    }
};
