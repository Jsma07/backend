const DetalleCompra = require('../../../Models/detallecompra');


const registrarDetalleCompra= async (req, res) => {
  try {
    const {IdCompra, IdInsumo, camtidad_insumo, precio_unitario, totalValorInsumos } = req.body;

    const detalleCompra = await DetalleCompra.create({
        IdCompra, 
        IdInsumo, 
        camtidad_insumo, 
        precio_unitario, 
        totalValorInsumos
    });

    res.status(201).json({ mensaje: 'Detalle de compra registrado', detalleCompra });
  } catch (error) {
    console.error('Error al registrar detalle de venta:', error);
    res.status(500).json({ mensaje: 'Error al registrar detalle de venta', error: error.message });
  }
};

module.exports = {
  registrarDetalleCompra
};