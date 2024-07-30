const Salida = require('../../Models/Salida')
const Insumo = require('../../Models/insumos'); 

const obtenerSalidas = async (req, res) => {
  try {
    const salidas = await Salida.findAll({
      include: {
        model: Insumo,
        as: 'insumo'
      }
    });
    res.status(200).json(salidas);
  } catch (error) {
    console.error('Error al obtener salidas:', error);
    res.status(500).json({ mensaje: 'Error al obtener salidas' });
  }
};

module.exports = {
  obtenerSalidas
};
