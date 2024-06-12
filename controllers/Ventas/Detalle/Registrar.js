const DetalleVentas = require('../../../Models/detalleventas');


const registrarDetalleVenta = async (req, res) => {
  try {
    const { Idventa, Idinsumo, Usos, Precio_unitario } = req.body;

    const detalleVenta = await DetalleVentas.create({
      Idventa,
      Idinsumo,
      Usos,
      Precio_unitario
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
