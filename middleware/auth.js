// Middleware de autorización
const jwt = require('jsonwebtoken');
const Usuario = require('../Models/usuarios'); // Asegúrate de que la ruta y el modelo sean correctos
const Roles = require('../Models/roles'); // Asegúrate de que la ruta y el modelo sean correctos
const PermisosXRol = require('../Models/permisos_roles'); // Modelo para la tabla permisosXrol
const Permiso = require('../Models/permisos'); // Modelo para los permisos

const authorize = (requiredPermissions) => {
  return async (req, res, next) => {
    const token = req.header('Authorization');

    console.log('Token recibido:', token);

    if (!token) {
      console.log('Acceso denegado. No hay token proporcionado.');
      return res.status(401).json({ mensaje: 'Acceso denegado. No hay token proporcionado.' });
    }

    try {
      const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
      req.usuario = decoded.usuario;

      console.log('Usuario decodificado:', req.usuario);

      // Buscar al usuario en la base de datos junto con sus roles y permisos a través de permisosXrol
      const user = await Usuario.findByPk(req.usuario.id, {
        include: [
          {
            model: Roles,
            through: {
              model: PermisosXRol,
              attributes: [], // No queremos traer todos los atributos de la tabla intermedia
            },
            include: [
              {
                model: Permiso,
              },
            ],
          },
        ],
      });

      if (!user) {
        console.log('Usuario no encontrado.');
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }

      // Obtener los permisos del usuario a partir de sus roles y permisosXrol
      const userPermissions = user.Roles.flatMap(role => role.Permisos.map(permiso => permiso.nombre));

      console.log('Permisos del usuario:', userPermissions);

      // Verificar si el usuario tiene todos los permisos requeridos
      const hasPermission = requiredPermissions.every(permission => userPermissions.includes(permission));

      if (!hasPermission) {
        console.log('Permisos insuficientes para acceder a esta función.');
        return res.status(403).json({ mensaje: 'Permisos insuficientes para acceder a esta función.' });
      }

      next(); // Continuar con la ejecución de la ruta protegida
    } catch (error) {
      console.error('Error en la verificación del token:', error);
      return res.status(401).json({ mensaje: 'Token inválido o expirado.' });
    }
  };
};

module.exports = authorize;
