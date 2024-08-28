const Compra = require("../../Models/compras");
const DetalleCompra = require("../../Models/detallecompra");
const Insumo = require("../../Models/insumos");
const { Op } = require("sequelize");

exports.anularCompra = async (req, res) => {
  const { id } = req.params;
  try {
    const compra = await Compra.findByPk(id);

    if (!compra) {
      return res
        .status(404)
        .json({ error: `Compra con ID ${id} no encontrada` });
    }

    const fechaCompra = new Date(compra.fecha_compra);
    const hoy = new Date();
    const diffTime = Math.abs(hoy - fechaCompra);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 3) {
      return res.status(400).json({
        error:
          "La compra solo puede ser anulada dentro de los 3 días de su registro",
      });
    }

    compra.estado_compra = "Anulada";
    await compra.save();

    const detallesCompra = await DetalleCompra.findAll({
      where: { IdCompra: id },
    });

    if (detallesCompra.length > 0) {
      await Promise.all(
        detallesCompra.map(async (detalle) => {
          const insumo = await Insumo.findByPk(detalle.IdInsumo);
          if (insumo) {
            insumo.Cantidad -= detalle.cantidad_insumo;

            if (insumo.Cantidad <= 0) {
              insumo.Cantidad = 0;
            }

            insumo.Estado = insumo.Cantidad > 0 ? "Disponible" : "Agotado";
            await insumo.save();
          }
        })
      );
    }

    res.status(200).json({
      message: `Compra con ID ${id} anulada exitosamente`,
      compra: compra,
    });
  } catch (error) {
    console.error("Error al anular la compra:", error);
    res.status(500).json({ error: "Error al anular la compra" });
  }
};
