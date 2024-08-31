const jwt = require('jsonwebtoken');
const Usuario = require('../Models/usuarios');
const Roles = require('../Models/roles');
const PermisosXRol = require('../Models/permisos_roles');
const Permiso = require('../Models/permisos');
const Empleado = require('../Models/empleados');
const Cliente = require('../Models/clientes');

const authorize = (requiredPermissions = []) => {
  return async (req, res, next) => {
    // Extraer el token del encabezado 'Authorization'
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null;

    console.log('Token recibido:', token);

    if (!token) {
      console.log('Acceso denegado. No hay token proporcionado.');
      return res.status(401).json({ mensaje: 'Acceso denegado. No hay token proporcionado.' });
    }

    try {
      // Verificar el token y obtener los datos decodificados
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.usuario = decoded;

      console.log('Usuario decodificado:', req.usuario);

      if (requiredPermissions.length === 0) {
        return next();
      }

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
                    attributes: [], 
                  }
                }
              ]
            }
          ]
        });
      } catch (error) {
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
                      attributes: [], 
                    }
                  }
                ]
              }
            ]
          });
        } catch (error) {
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
                        attributes: [], 
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

      if (!user || !user.role || !user.role.permisos) {
        console.log('Usuario sin roles asignados o permisos asociados.');
        console.log('Usuario encontrado:', user);
        return res.status(403).json({ mensaje: 'El usuario no tiene roles asignados o permisos asociados.' });
      }

      const userPermissions = user.role.permisos.map(permiso => permiso.nombre);

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
  }
};

module.exports = authorize;
