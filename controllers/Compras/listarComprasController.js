const ConexionDB = require('../../Db/Conexion');

exports.listarCompras = async (req, res) => { 
    try {
        const connection = await ConexionDB(); 
        console.log('Conexión a la base de datos establecida');

        const query = `
            SELECT c.*, dc.* 
            FROM compras c
            INNER JOIN detallecompra dc ON c.IdCompra = dc.IdCompra
        `;
        const [rows, fields] = await connection.query(query);
        console.log('Resultado de la consulta:', rows);

        if (rows.length === 0) {
            console.log('No se encontraron compras');
            return res.status(404).json({ error: 'No se encontraron compras' });
        }

        const comprasAgrupadas = rows.reduce((acc, row) => {
            if (!acc[row.IdCompra]) {
                acc[row.IdCompra] = {
                    ...row,
                    fecha_compra: new Date(row.fecha_compra).toLocaleDateString(),
                    total_compra: parseFloat(row.total_compra).toLocaleString('es-CO', { style: 'currency', currency: 'COP' }),
                    subtotal_compra: parseFloat(row.subtotal_compra).toLocaleString('es-CO', { style: 'currency', currency: 'COP' }),
                    descuento_compra: parseFloat(row.descuento_compra).toLocaleString('es-CO', { style: 'currency', currency: 'COP' }),
                    iva_compra: parseFloat(row.iva_compra).toLocaleString('es-CO', { style: 'currency', currency: 'COP' }),
                    detalles: []
                };
            }
            if (row.IdDetalleCompra) { 
                acc[row.IdCompra].detalles.push({
                    IdDetalleCompra: row.IdDetalleCompra,
                    cantidad_insumo: row.cantidad_insumo,
                    valorTotalInsumos: parseFloat(row.valorTotalInsumos).toLocaleString('es-CO', { style: 'currency', currency: 'COP' }),
                });
            }
            return acc;
        }, {});

        const resultado = Object.values(comprasAgrupadas);

        res.status(200).json(resultado);
    } catch (error) {
        console.error("Error al buscar las compras", error);
        res.status(500).json({ error: 'Error al buscar las compras' });
    }
};
