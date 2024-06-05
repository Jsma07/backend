const Roles = require('../../Models/roles');
const Permisos = require('../../Models/permisos');
const PermisosXRol = require('../../Models/permisos_roles');

const crearRol = async (req, res) => {
    const { nombre, permisos } = req.body;
  
    try {
      if (!nombre || nombre.trim() === '') {
        return res.status(400).json({ error: 'Nombre del rol es requerido' });
      }
  
      if (!Array.isArray(permisos) || permisos.some(id => typeof id !== 'number' || id <= 0)) {
        return res.status(400).json({ error: 'Los permisos deben ser un arreglo de números enteros positivos' });
      }
  
      const nuevoRol = await Roles.create({ nombre });
  
      if (permisos.length > 0) {
        const permisosAsociados = await Permisos.findAll({ where: { idPermiso: permisos } });
        await nuevoRol.setPermisos(permisosAsociados);
      }
  
      res.status(200).json({ mensaje: 'Rol creado exitosamente', rol: nuevoRol });
    } catch (error) {
      console.error('Error al crear el rol: ', error);
      res.status(500).json({ error: 'Error interno del servidor al crear el rol' });
    }
  };
  
  
 module.exports = {crearRol}  
