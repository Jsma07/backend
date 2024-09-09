const Ventas = require("../../Models/ventas");

async function actualizarTotalesVenta(req, res) {
  const idVenta = req.params.idVenta;
  const { Subtotal, Descuento, Total } = req.body; // Recibe el Total directamente del frontend

  try {
    const venta = await Ventas.findByPk(idVenta);
    if (!venta) {
      return res.status(404).json({ error: "La venta no fue encontrada" });
    }

    // Actualiza los valores con los datos recibidos del frontend
    venta.Subtotal = Subtotal;
    venta.Descuento = Descuento;
    venta.Total = Total;

    await venta.save();

    res.json({ success: true, venta });
  } catch (error) {
    console.error(
      "Ocurrió un error al actualizar los totales de la venta:",
      error
    );
    res.status(500).json({ error: "Hubo un error al procesar la solicitud" });
  }
}

module.exports = {
  actualizarTotalesVenta,
};
