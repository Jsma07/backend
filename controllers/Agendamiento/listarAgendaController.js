const mysql = require('mysql2/promise');

exports.getAllUsers = async (req, res) =>{
    try {

        //Establecer conexion con la base Mysql server
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            port: process.env.DB_PORT
        });

        // Consulta para obtener todos las agendas

        const [agendasRows, fields] = await connection.execute('SELECT * FROM agendamiento')

        // Close the connection
        await connection.end();

        // return the dates in format Json
        res.json({
            agendamiento : agendasRows
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'internal server error'});
    }


}
