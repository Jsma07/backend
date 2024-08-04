const Insumo = require('../../Models/insumos'); // Ajusta el path al archivo correcto
const Salida = require('../../Models/Salida')


const crearSalida = async (req, res) => {
  try {
    const { Idinsumos, Cantidad, Fecha_salida, Estado } = req.body;

    // Validar que el insumo exista
    const insumo = await Insumo.findByPk(Idinsumos);
    if (!insumo) {
      return res.status(404).json({ mensaje: 'Insumo no encontrado' });
    }

    // Validar el estado
    const estadosValidos = ['Pendiente', 'Completado'];
    if (!estadosValidos.includes(Estado)) {
      return res.status(400).json({ mensaje: 'El estado debe ser "Pendiente" o "Completado"' });
    }

    // Crear una nueva salida
    const nuevaSalida = await Salida.create({
      Idinsumos,
      Cantidad,
      Fecha_salida,
      Estado
    });

    res.status(201).json(nuevaSalida);
  } catch (error) {
    console.error('Error al crear salida:', error);
    res.status(500).json({ mensaje: 'Error al crear salida' });
  }
};

module.exports = {
  crearSalida
};
