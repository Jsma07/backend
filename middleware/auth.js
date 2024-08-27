const jwt = require('jsonwebtoken');
const Usuario = require('../Models/usuarios');
const Roles = require('../Models/roles');
const PermisosXRol = require('../Models/permisos_roles');
const Permiso = require('../Models/permisos');
const Empleado = require('../Models/empleados')
const Cliente = require('../Models/clientes')

const authorize = (requiredPermissions) => {
  return async (req, res, next) => {
    const token = req.header('Authorization');

    console.log('Token recibido:', token);

    if (!token) {
      console.log('Acceso denegado. No hay token proporcionado.');
      return res.status(401).json({ mensaje: 'Acceso denegado. No hay token proporcionado.' });
    }

    try {
      // Remover el prefijo 'Bearer 'el token
      const tokenWithoutBearer = token.replace('Bearer ', '');

      // Verificar el token y obtener los datos decodificados
      const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);

      // console.log('Token decodificado:', decoded);

      req.usuario = decoded;

      console.log('Usuario decodificado:', req.usuario);

      // Si no se especifica ningún permiso requerido, permite el acceso
      if (!requiredPermissions || requiredPermissions.length === 0) {
        return next();
      }

      // Buscar al usuario en la base de datos junto con sus roles y permisos a través de permisosXrol
      let user;
      try {
        user = await Usuario.findByPk(req.usuario.id, {
          include: [
            {
              model: Roles,
              include: [
                {
                  model: Permiso,
                  through: {
                    model: PermisosXRol,
                    attributes: [], // No queremos traer todos los atributos de la tabla intermedia
                  }
                }
              ]
            }
          ]
        });
      } catch (error) {
        // Si no se encuentra el usuario en la tabla de usuarios, buscar en la tabla de empleados
        try {
          user = await Empleado.findByPk(req.usuario.IdEmpleado, {
            include: [
              {
                model: Roles,
                include: [
                  {
                    model: Permiso,
                    through: {
                      model: PermisosXRol,
                      attributes: [], // No queremos traer todos los atributos de la tabla intermedia
                    }
                  }
                ]
              }
            ]
          });
        } catch (error) {
          // Si no se encuentra el usuario en la tabla de empleados, buscar en la tabla de clientes
          try {
            user = await Cliente.findByPk(req.usuario.id, {
              include: [
                {
                  model: Roles,
                  include: [
                    {
                      model: Permiso,
                      through: {
                        model: PermisosXRol,
                        attributes: [], // No queremos traer todos los atributos de la tabla intermedia
                      }
                    }
                  ]
                }
              ]
            });
          } catch (error) {
            console.log('Usuario no encontrado.');
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
          }
        }
      }

      console.log('Usuario encontrado:', user);

      // Verificar si el usuario tiene roles y permisos asignados
      if (!user.role ||!user.role.permisos) {
        console.log('Usuario sin roles asignados o permisos asociados.');
        console.log('Usuario encontrado:', user); // Agregar este log para verificar la estructura completa del usuario
        return res.status(403).json({ mensaje: 'El usuario no tiene roles asignados o permisos asociados.' });
      }

      // Obtener los permisos del usuario a partir de sus roles y permisosXrol
      const userPermissions = user.role.permisos.map(permiso => permiso.nombre);

      // Verificar si el usuario tiene todos los permisos requeridos
      const hasPermission = requiredPermissions.every(permission => userPermissions.includes(permission));

      if (!hasPermission) {
        console.log('Permisos insuficientes para acceder a esta función.');
        return res.status(403).json({ mensaje: 'Permisos insuficientes para acceder a esta función.' });
      }

      req.userData = {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        correo: user.correo,
        rol: user.role.nombre
      };

      next();

    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        console.error('Token JWT expirado:', error);
        return res.status(401).json({ mensaje: 'Token expirado. Por favor, inicia sesión nuevamente.' });
      } else {
        console.error('Error en la verificación del token:', error);
        return res.status(401).json({ mensaje: 'Token inválido o expirado.' });
      }
    }
  }}

module.exports = authorize;
