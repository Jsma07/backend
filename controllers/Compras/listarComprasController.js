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

        // Agrupar los resultados
        const comprasAgrupadas = rows.reduce((acc, row) => {
            if (!acc[row.IdCompra]) {
                acc[row.IdCompra] = {
                    ...row,
                    fecha_compra: new Date(row.fecha_compra).toLocaleDateString(),
                    detalles: []
                };
            }
            if (row.IdDetalleCompra) { // Si hay detalles asociados
                acc[row.IdCompra].detalles.push({
                    IdDetalleCompra: row.IdDetalleCompra,
                    cantidad_insumo: row.cantidad_insumo,
                    valorTotalInsumos: row.valorTotalInsumos,
                    // Añadir otros campos de detallecompra según sea necesario
                });
            }
            return acc;
        }, {});

        // Convertir el objeto de agrupación a una lista
        const resultado = Object.values(comprasAgrupadas);

        res.status(200).json(resultado);
    } catch (error) {
        console.error("Error al buscar las compras", error);
        res.status(500).json({ error: 'Error al buscar las compras' });
    }
};
