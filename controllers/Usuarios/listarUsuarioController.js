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

// Importa los modelos necesarios
const Usuario = require('../../Models/usuarios');
const Roles = require('../../Models/roles');
const PermisosXRol = require('../../Models/permisos_roles');
const Permiso = require('../../Models/permisos');

exports.getUser = async (req, res) => {
    try {
      const usuario = await Usuario.findByPk(req.usuario.id, {
        include: [
          {
            model: Roles,
            include: [
              {
                model: Permiso,
                through: {
                  model: PermisosXRol,
                  attributes: [],
                },
              },
            ],
          },
        ],
      });
  
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      // Verificar si el usuario tiene roles y permisos asignados
      if (!usuario.role || !usuario.role.permisos) {
        return res.status(403).json({ error: 'El usuario no tiene roles o permisos asignados' });
      }
  
      // Obtener los permisos del usuario a partir de sus roles y permisosXrol
      const userPermissions = usuario.role.permisos.map(permiso => permiso.nombre);
  
      // Devolver los datos del usuario junto con los permisos
      res.json({
        user: {
          id: usuario.id,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          correo: usuario.correo,
        },
        permisos: userPermissions,
      });
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };