const DetalleVentas = require('../../../Models/detalleventas');
const Ventas = require('../../../Models/ventas');
const Insumos = require('../../../Models/insumos');
const Cliente = require('../../../Models/clientes');
const Empleado = require('../../../Models/empleados');
const Servicio = require('../../../Models/servicios');

// Función para listar todos los detalles de ventas
async function ListarDetalleVentas(req, res) {
    try {
        const listaDetalleVentas = await DetalleVentas.findAll({
            include: [
                {
                    model: Ventas,
                    as: 'venta',
                    include: [
                        {
                            model: Cliente,
                            as: 'cliente',
                            attributes: ['Nombre', 'Apellido']
                        },
                        {
                            model: Empleado,
                            as: 'empleado',
                            attributes: ['Nombre', 'Apellido']
                        },
                        {
                            model: Servicio,
                            as: 'servicio',
                            attributes: ['Nombre_Servicio', 'ImgServicio']
                        }
                    ]
                },
                {
                    model: Insumos,
                    as: 'insumo',
                    attributes: ['NombreInsumos', 'Imagen', 'PrecioUnitario']
                }
            ]
        });
        res.json(listaDetalleVentas);
    } catch (error) {
        console.error("Ocurrió un error al listar los detalles de ventas:", error);
        res.status(500).json({ error: 'Hubo un error al procesar la solicitud' });
    }
}

async function BuscarDetalleVentaPorId(req, res) {
    const { id } = req.params;
    try {
        const detalleVenta = await DetalleVentas.findAll({
            where: { Idventa: id },
            include: [
                {
                    model: Ventas,
                    as: 'venta',
                    include: [
                        {
                            model: Cliente,
                            as: 'cliente',
                            attributes: ['Nombre', 'Apellido']
                        },
                        {
                            model: Empleado,
                            as: 'empleado',
                            attributes: ['Nombre', 'Apellido']
                        },
                        {
                            model: Servicio,
                            as: 'servicio',
                            attributes: ['Nombre_Servicio', 'ImgServicio']
                        }
                    ],
                    attributes: ['Iva', 'Subtotal', 'Fecha', 'Descuento', 'Total', 'Estado']

                },
                {
                    model: Insumos,
                    as: 'insumo',
                    attributes: ['NombreInsumos', 'Imagen', 'PrecioUnitario']
                }
            ]
        });

        if (!detalleVenta || detalleVenta.length === 0) {
            return res.status(404).json({ error: 'Detalle de venta no encontrado' });
        }

        // Agrupa los insumos por Idventa
        const ventasAgrupadas = detalleVenta.reduce((acc, curr) => {
            const idVenta = curr.Idventa;
            if (!acc[idVenta]) {
                acc[idVenta] = {
                    idVenta,
                    venta: curr.venta,
                    insumos: []
                };
            }
            acc[idVenta].insumos.push(curr.insumo);
            return acc;
        }, {});

        const resultado = Object.values(ventasAgrupadas);

        res.json(resultado);
    } catch (error) {
        console.error("Ocurrió un error al buscar el detalle de venta:", error);
        res.status(500).json({ error: 'Hubo un error al procesar la solicitud' });
    }
}


module.exports = {
    ListarDetalleVentas,
    BuscarDetalleVentaPorId
};
