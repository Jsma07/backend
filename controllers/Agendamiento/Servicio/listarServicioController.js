const mysql = require('mysql2/promise');
const servicios = require('../../../Models/servicios');

exports.getAllService = async (req, res) =>{
    try{
    //Establecer la conexion con la base de datos utilizzando MYSQL con las Variables de Entorno
    const connection = await mysql.createConnection({
        // HOST DEl SERVIDOR
        host: process.env.DB_HOST,
        // USUARIO DEL SERVIDOR
        user: process.env.DB_USER,
        // CONTRASEÑA DEL SERVIDOR
        password: process.env.DB_PASSWORD,
        // NOMBRE DE LA BASE DE DATOS
        database: process.env.DB_DATABASE,
        // PUERTO EN EL QUE SE EJECUTARA
        port: process.env.DB_PORT
    });

    // Consulta para obtener todos los datos
    const [serviciosRows, fields] = await connection.execute('SELECT * FROM servicios')

    // CERRAR LA CONEXIÖN
    await connection.end();

    //DEVOLVER LOS DATOS EN FORMATO DE JSON
    res.json({
        servicios:serviciosRows,
    });

    } catch(error){
        console.error(error);
        res.status(500).json({error: 'Error interno en del servidor'})
    }
};