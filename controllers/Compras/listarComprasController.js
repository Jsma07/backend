const ConexionDB = require('../../Db/Conexion');

exports.listarCompras = async (req, res) => { 
    try {
        const connection = await ConexionDB(); 
        const query = `
            SELECT c.*, dc.* 
            FROM compras c
            INNER JOIN detalle_compras dc ON c.id_compra = dc.id_compra
        `;
        const [rows, fields] = await connection.query(query);

        const formattedRows = rows.map(row => {
            const date = new Date(row.fecha_compra);
            const formattedDate = `${('0' + date.getDate()).slice(-2)}/${('0' + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear().toString().slice(-2)}`;
            return { ...row, fecha_compra: formattedDate };
        });

        res.status(200).json(formattedRows);
    } catch (error) {
        console.error("Error al buscar las compras", error);
        res.status(500).json({ error: 'Error al buscar las compras' });
    }
};
