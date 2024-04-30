const mysql = require('mysql2/promise');

exports.getAllUsers = async (req, res) => {
    try {
        // Establecer conexión con la base de datos MySQL utilizando las variables de entorno
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            port: process.env.DB_PORT
        });

        // Consulta para obtener todos los usuarios
        const [usuariosRows, fields] = await connection.execute('SELECT * FROM usuarios');

        // Consulta para obtener todos los roles
        // const [rolesRows, fields2] = await connection.execute('SELECT * FROM roles');

        // Cerrar la conexión
        await connection.end();

        // Devolver los datos en formato JSON
        res.json({
            usuarios: usuariosRows,
            // roles: rolesRows
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
