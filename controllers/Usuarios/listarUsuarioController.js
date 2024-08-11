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

const Empleado = require('../../Models/empleados');
const Cliente = require('../../Models/clientes');

exports.getUser = async (req, res) => {
  try {
    let user = null;

    const { correo, documento } = req.usuario;

    // Buscar en la tabla de usuarios
    user = await Usuario.findOne({
      where: { [correo ? 'correo' : 'documento']: correo || documento },
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

    // Si no se encuentra en la tabla de usuarios, buscar en empleados
    if (!user) {
      user = await Empleado.findOne({
        where: { Correo: correo },
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
    }

    // Si no se encuentra en la tabla de empleados, buscar en clientes
    if (!user) {
      user = await Cliente.findOne({
        where: { Correo: correo },
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
    }

    // Si el usuario no se encuentra en ninguna tabla
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado en ninguna tabla' });
    }

    // Verificar si el usuario tiene roles y permisos asignados
    if (!user.role || !user.role.permisos) {
      return res.status(403).json({ error: 'El usuario no tiene roles o permisos asignados' });
    }

    // Obtener los permisos del usuario a partir de sus roles y permisosXrol
    const userPermissions = user.role.permisos.map(permiso => permiso.nombre);

    // Determinar el tipo de usuario (usuario, empleado o cliente)
    let userType = '';
    if (user instanceof Usuario) {
      userType = 'usuario';
    } else if (user instanceof Empleado) {
      userType = 'empleado';
    } else if (user instanceof Cliente) {
      userType = 'cliente';
    }

    // Devolver los datos del usuario junto con los permisos
    res.json({
      user: {
        id: user.id || user.IdEmpleado || user.IdCliente,
        nombre: user.nombre || user.Nombre,
        apellido: user.apellido || user.Apellido,
        correo: user.correo || user.Correo,
        telefono: user.telefono || user.Telefono,
        documento: user.documento || user.Documento,
        tipo: userType
      },
      permisos: userPermissions,
      tipo: userType, // Tipo de usuario: 'usuario', 'empleado' o 'cliente'
    });
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};



exports.editarPerfil = async (req, res) => {
  const { nombre, apellido, telefono, correo, documento, tipo } = req.body;

  // Validar datos recibidos
  if (!nombre || !apellido || !telefono || !correo || !documento || !tipo) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  if (!req.usuario || !req.usuario.id) {
    return res.status(401).json({ error: 'No se ha autenticado correctamente.' });
  }

  try {
    let user = null;

    // Determinar el modelo basado en el tipo de usuario
    switch (tipo) {
      case 'usuario':
        user = await Usuario.findByPk(req.usuario.id);
        break;
      case 'empleado':
        user = await Empleado.findByPk(req.usuario.id);
        break;
      case 'cliente':
        user = await Cliente.findByPk(req.usuario.id);
        break;
      default:
        return res.status(400).json({ error: 'Tipo de usuario no válido.' });
    }

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    // Mostrar los datos antes de la actualización
    console.log('Datos antes de la actualización:', user.dataValues);

    // Actualizar los campos del usuario, teniendo en cuenta el formato de los campos en la base de datos
    if (tipo === 'empleado') {
      user.set({
        Nombre: nombre,
        Apellido: apellido,
        Telefono: telefono,
        Correo: correo,
        Documento: documento
      });
    } else if (tipo === 'cliente') {
      user.set({
        Nombre: nombre,
        Apellido: apellido,
        Telefono: telefono,
        Correo: correo,
        Documento: documento
      });
    } else { // Para 'usuario' que puede tener campos en minúsculas
      user.set({
        nombre: nombre,
        apellido: apellido,
        telefono: telefono,
        correo: correo,
        documento: documento
      });
    }

    // Guardar cambios en la base de datos
    await user.save();

    // Mostrar los datos después de la actualización
    console.log('Datos después de la actualización:', user.dataValues);

    res.status(200).json({ message: 'Perfil actualizado correctamente.' });
  } catch (error) {
    console.error('Error al actualizar el perfil:', error.message);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};



