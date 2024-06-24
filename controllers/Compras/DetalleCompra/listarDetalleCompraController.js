const ConexionDB = require('../../../Db/Conexion');

exports.listarDetalleCompras = async (req, res) => { 
    try {
        const connection = await ConexionDB(); 
        const [rows, fields] = await connection.query('SELECT * FROM detalleCompra');
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error al buscar detalle", error);
        res.status(500).json({ error: 'Error al buscar detallr' });
    }
}