const ConexionDB = require('../../Db/Conexion');

exports.listarInsumos = async (req, res) => { 
    try {
        const connection = await ConexionDB(); 
        const [rows, fields] = await connection.query(`
            SELECT insumos.*, categorias.nombre_categoria
            FROM insumos
            JOIN categorias ON insumos.IdCategoria = categorias.IdCategoria
        `);
        console.log(rows)
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error al buscar insumos", error);
        res.status(500).json({ error: 'Error al buscar insumos' });
    }
};
