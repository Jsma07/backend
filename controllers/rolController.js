const mysql = require('mysql2/promise');

exports.getAllRoles = async (req, res) => {
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
        const [rolesRows, fields] = await connection.execute(
            ' SELECT r.idRol, r.nombre AS nombreRol, p.idPermiso, p.nombre AS nombrePermiso FROM roles r LEFT JOIN permisos_roles pr ON r.idRol = pr.rolId LEFT JOIN permisos p ON pr.permisoId = p.idPermiso;'
            );

        // Consulta para obtener todos los roles
        // const [rolesRows, fields2] = await connection.execute('SELECT * FROM roles');

        // Cerrar la conexión
        await connection.end();
        const rolesWithPermissions = {};
        rolesRows.forEach(row => {
            const { idRol, nombreRol, idPermiso, nombrePermiso } = row;
            if (!rolesWithPermissions[idRol]) {
                rolesWithPermissions[idRol] = { id: idRol, nombre: nombreRol, permisos: [] };
            }
            if (idPermiso) {
                rolesWithPermissions[idRol].permisos.push({ id: idPermiso, nombre: nombrePermiso });
            }
        });
        

        // Devolver los datos en formato JSON
        res.json({
            roles: Object.values(rolesWithPermissions)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
