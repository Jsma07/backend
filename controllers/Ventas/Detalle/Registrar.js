const DetalleVentas = require('../../../Models/detalleventas');


const registrarDetalleVenta = async (req, res) => {
  try {
    const { detalles } = req.body;

    // Iterar sobre cada detalle y guardarlos en la base de datos
    const resultados = await Promise.all(detalles.map(async (detalle) => {
      const detalleVenta = await DetalleVentas.create({
        Idventa: detalle.Idventa,
        Idinsumo: detalle.Idinsumo,
        Usos: detalle.Usos,
        Precio_unitario: detalle.Precio_unitario
      });
      return detalleVenta;
    }));

    res.status(201).json({ mensaje: 'Detalles de venta registrados', detalles: resultados });
  } catch (error) {
    console.error('Error al registrar detalles de venta:', error);
    res.status(500).json({ mensaje: 'Error al registrar detalles de venta', error: error.message });
  }
};

module.exports = {
  registrarDetalleVenta
};
