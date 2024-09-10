const ConexionDB = require('../../Db/Conexion');

exports.listarInsumos = async (req, res) => { 
    try {
        const connection = await ConexionDB(); 
        const [rows, fields] = await connection.query(`
            SELECT insumos.*, categorias.nombre_categoria
            FROM insumos
            JOIN categorias ON insumos.IdCategoria = categorias.IdCategoria
        `);

        const formattedRows = rows.map(row => ({
            ...row,
            PrecioUnitario: new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                maximumFractionDigits: 0
            }).format(row.PrecioUnitario)
        }));

        console.log(formattedRows);
        res.status(200).json(formattedRows);
    } catch (error) {
        console.error("Error al buscar insumos", error);
        res.status(500).json({ error: 'Error al buscar insumos' });
    }
};
