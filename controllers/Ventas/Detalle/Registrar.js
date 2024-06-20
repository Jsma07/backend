const DetalleVentas = require('../../../Models/detalleventas');


const registrarDetalleVenta = async (req, res) => {
  try {
<<<<<<< HEAD
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
=======
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
>>>>>>> d7eb69f55c01dcf1a322014370365ceb179513a1
  }
};

module.exports = {
  registrarDetalleVenta
};
