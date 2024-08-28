const Compra = require("../../Models/compras");
const DetalleCompra = require("../../Models/detallecompra");
const Insumo = require("../../Models/insumos");

async function procesarInsumo(detalle) {
  try {
    const insumoExistente = await Insumo.findOne({
      where: { IdInsumos: detalle.IdInsumo },
    });

    if (!insumoExistente) {
      throw new Error(`Insumo con ID ${detalle.IdInsumo} no encontrado`);
    }

    // Actualizar la cantidad y el estado del insumo
    insumoExistente.Cantidad += detalle.cantidad_insumo;
    insumoExistente.Estado =
      insumoExistente.Cantidad > 0 ? "Disponible" : "Agotado";

    // Solo actualizar el precio unitario si se envió en el detalle
    if (detalle.precio_unitario !== undefined) {
      insumoExistente.PrecioUnitario = detalle.precio_unitario;
    }

    await insumoExistente.save();

    const valorInsumo =
      insumoExistente.PrecioUnitario * detalle.cantidad_insumo;

    return {
      IdInsumo: insumoExistente.IdInsumos,
      precio_unitario: insumoExistente.PrecioUnitario,
      cantidad_insumo: detalle.cantidad_insumo,
      totalValorInsumos: valorInsumo,
    };
  } catch (error) {
    console.error("Error al procesar insumo:", error);
    throw error;
  }
}

async function guardarCompra(req, res) {
  try {
    const { fecha_compra, descuento_compra, estado_compra, detallesCompra } =
      req.body;

    console.log("Datos recibidos:", req.body);

    if (!Array.isArray(detallesCompra) || detallesCompra.length === 0) {
      return res
        .status(400)
        .json({ error: "Detalles de compra vacíos o inválidos" });
    }

    let totalValorInsumos = 0;
    const detallesCompraGuardados = [];

    for (const detalle of detallesCompra) {
      console.log(
        `Procesando insumo ID ${detalle.IdInsumo} con precio_unitario ${detalle.precio_unitario}`
      );
      const detalleProcesado = await procesarInsumo(detalle);
      console.log(`Detalle procesado: ${JSON.stringify(detalleProcesado)}`);
      totalValorInsumos += detalleProcesado.totalValorInsumos;
      detallesCompraGuardados.push(detalleProcesado);
    }

    const iva_compra = 0.19 * totalValorInsumos;
    const total_compra = totalValorInsumos - descuento_compra;
    const subtotal_compra = total_compra - iva_compra;

    // Crear nueva compra
    const nuevaCompra = await Compra.create({
      fecha_compra,
      descuento_compra,
      iva_compra,
      subtotal_compra,
      total_compra,
      estado_compra,
    });

    // Crear detalles de compra asociados a la nueva compra
    const detallesCompraGuardadosConId = await Promise.all(
      detallesCompraGuardados.map(async (detalle) => {
        return await DetalleCompra.create({
          IdCompra: nuevaCompra.IdCompra,
          IdInsumo: detalle.IdInsumo,
          precio_unitario: detalle.precio_unitario,
          cantidad_insumo: detalle.cantidad_insumo,
          totalValorInsumos: detalle.totalValorInsumos,
        });
      })
    );

    res.status(200).json({
      estado: "Compra y detalle de compra guardados correctamente",
      compra: nuevaCompra,
      detallesCompra: detallesCompraGuardadosConId,
    });
  } catch (error) {
    console.error("Error al guardar la compra", error);
    res.status(500).json({ error: "Error al guardar la compra" });
  }
}

module.exports = {
  guardarCompra,
};
