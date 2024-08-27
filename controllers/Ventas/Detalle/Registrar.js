const DetalleVentas = require("../../../Models/detalleventas");

const registrarDetalleVenta = async (req, res) => {
  try {
    const { Idventa, IdAdiciones } = req.body;

    if (!Idventa || !Array.isArray(IdAdiciones)) {
      return res
        .status(400)
        .json({
          mensaje: "Idventa o IdAdiciones no proporcionados correctamente",
        });
    }

    // Crear los detalles de venta para cada adición
    const detallesVenta = await Promise.all(
      IdAdiciones.map((idAdicion) =>
        DetalleVentas.create({ Idventa, IdAdiciones: idAdicion })
      )
    );

    res
      .status(201)
      .json({ mensaje: "Detalles de venta registrados", detallesVenta });
  } catch (error) {
    console.error("Error al registrar detalles de venta:", error);
    res
      .status(500)
      .json({
        mensaje: "Error al registrar detalles de venta",
        error: error.message,
      });
  }
};

module.exports = {
  registrarDetalleVenta,
};
