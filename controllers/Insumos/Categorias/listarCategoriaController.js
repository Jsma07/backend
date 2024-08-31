const ConexionDB = require('../../../Db/Conexion');

exports.listarCategorias = async (req, res) => { 
    try {
        const connection = await ConexionDB(); 
        const [rows, fields] = await connection.query('SELECT * FROM categorias');
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error al buscar categorias", error);
        res.status(500).json({ error: 'Error al buscar categorias' });
    }
};