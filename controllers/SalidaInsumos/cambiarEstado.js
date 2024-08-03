const Salida = require('../../Models/Salida')

const cambiarEstado = async (req, res) => {
  try {
    const { idSalida } = req.params; // ID de la salida a actualizar
    const { nuevoEstado } = req.body; // Nuevo estado

    // Validar el nuevo estado
    if (!['Pendiente', 'Completado'].includes(nuevoEstado)) {
      return res.status(400).json({ mensaje: 'Estado inválido' });
    }

    // Buscar la salida
    const salida = await Salida.findByPk(idSalida);
    if (!salida) {
      return res.status(404).json({ mensaje: 'Salida no encontrada' });
    }

    // Actualizar el estado
    salida.Estado = nuevoEstado;
    await salida.save();

    res.status(200).json(salida);
  } catch (error) {
    console.error('Error al cambiar el estado:', error);
    res.status(500).json({ mensaje: 'Error al cambiar el estado' });
  }
};

module.exports = {
  cambiarEstado
};
