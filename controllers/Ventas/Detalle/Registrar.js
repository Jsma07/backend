const DetalleVentas = require('../../../Models/detalleventas');

const registrarDetalleVenta = async (req, res) => {
  try {
    const { Idventa, IdAdiciones } = req.body;

    if (Idventa === undefined || IdAdiciones === undefined) {
      return res.status(400).json({ mensaje: 'Idventa o IdAdiciones no proporcionados' });
    }

    const detalleVenta = await DetalleVentas.create({
      Idventa,
      IdAdiciones
    });

    res.status(201).json({ mensaje: 'Detalle de venta registrado', detalleVenta });
  } catch (error) {
    console.error('Error al registrar detalle de venta:', error);
    res.status(500).json({ mensaje: 'Error al registrar detalle de venta', error: error.message });
  }
};

module.exports = {
  registrarDetalleVenta
};
