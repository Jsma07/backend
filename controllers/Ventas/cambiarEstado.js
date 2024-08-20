const Ventas = require("../../Models/ventas");

async function cambiarEstadoVenta(req, res) {
  const idVenta = req.params.idVenta;
  const nuevoEstado = parseInt(req.body.Estado, 10);

  try {
    const venta = await Ventas.findByPk(idVenta);
    if (!venta) {
      return res.status(404).json({ error: "La venta no fue encontrada" });
    }

    if (nuevoEstado === 3) {
      // Anulación de venta
      const fechaRegistro = new Date(venta.Fecha);
      const ahora = new Date();

      // Si han pasado más de 2 minutos, rechazar la anulación
      if (ahora - fechaRegistro > 2 * 60 * 1000) {
        return res.status(403).json({
          error: "La venta no puede ser anulada después de 2 minutos",
        });
      }
    }

    venta.Estado = nuevoEstado;
    await venta.save();

    res.json({ success: true, venta });
  } catch (error) {
    console.error("Ocurrió un error al cambiar el estado de la venta:", error);
    res.status(500).json({ error: "Hubo un error al procesar la solicitud" });
  }
}

module.exports = {
  cambiarEstadoVenta,
};
