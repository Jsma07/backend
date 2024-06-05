
// controllers/permisosController.js

const Permisos = require('../../Models/permisos');

// Función para listar todos los permisos
exports.listarPermisos = async (req, res) => {
  try {
    const permisos = await Permisos.findAll();
    res.json(permisos);
  } catch (error) {
    console.error('Error al listar permisos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};