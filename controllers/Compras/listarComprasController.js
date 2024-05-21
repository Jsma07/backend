const ConexionDB = require('../Db/Conexion');

exports.listarCompras = async (req, res) => { 
    try {
        const connection = await ConexionDB(); 
        const [rows, fields] = await connection.query('SELECT * FROM compras');
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error al buscar las compras", error);
        res.status(500).json({ error: 'Error al buscar las compras' });
    }
};
