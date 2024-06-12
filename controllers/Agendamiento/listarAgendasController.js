    const ConexionDB = require('../../Db/Conexion');

    exports.listarAgendamientos = async (req, res) =>{
        try{
            const connection = await ConexionDB();
            const [rows, fields] = await connection.execute('SELECT * FROM agendamiento');
            res.status(200).json(rows);
        } catch (error) {
            console.error("Error al buscar las citas", error);
            res.status(400).json({error: 'Error al buscar la cita'})
        }
    };