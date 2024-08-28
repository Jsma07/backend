const DetalleCompra = require("../../../Models/detallecompra");
const Compras = require("../../../Models/compras");
const Insumos = require("../../../Models/insumos");

// Función para formatear valores monetarios
const formatCurrency = (value) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  }).format(value);
};

// Controlador para listar detalles de compras
async function listarDetalleCompras(req, res) {
  try {
    const listaDetalleCompras = await DetalleCompra.findAll({
      include: [
        { model: Compras, as: "compra" },
        {
          model: Insumos.scope("notDeleted"),
          as: "insumo",
          attributes: ["NombreInsumos", "Imagen"], // No incluir PrecioUnitario aquí
        },
      ],
    });

    // Formatear los datos para incluir el PrecioUnitario de detallecompra
    const listaDetalleComprasFormatted = listaDetalleCompras.map((detalle) => ({
      ...detalle.toJSON(),
      insumos: detalle.insumo.map((insumo) => ({
        NombreInsumos: insumo.NombreInsumos,
        imagen: insumo.Imagen,
        PrecioUnitario: formatCurrency(detalle.precio_unitario), // Usa el precio_unitario de DetalleCompra
        cantidad_insumo: detalle.cantidad_insumo,
        totalValorInsumos: formatCurrency(detalle.totalValorInsumos),
      })),
      totalValorInsumos: formatCurrency(detalle.totalValorInsumos),
    }));

    res.json(listaDetalleComprasFormatted);
  } catch (error) {
    console.error("Error al buscar detalles de compra:", error);
    res.status(500).json({ error: "Error al buscar detalles de compra" });
  }
}

// Controlador para buscar detalle de compra por ID
async function BuscarDetalleCompraPorId(req, res) {
  const { id } = req.params;
  console.log("ID ENCONTRADO:", id);

  try {
    const detalleCompra = await DetalleCompra.findAll({
      where: { IdCompra: id },
      include: [
        {
          model: Compras,
          as: "compra",
          attributes: [
            "fecha_compra",
            "descuento_compra",
            "iva_compra",
            "subtotal_compra",
            "total_compra",
            "estado_compra",
          ],
        },
        {
          model: Insumos,
          as: "insumo",
          attributes: ["NombreInsumos", "Imagen"], // No incluir PrecioUnitario aquí
        },
      ],
    });

    if (!detalleCompra || detalleCompra.length === 0) {
      return res.status(404).json({ error: "Detalle de compra no encontrado" });
    }

    const comprasAgrupadas = detalleCompra.reduce((acc, curr) => {
      const idCompra = curr.IdCompra;
      if (!acc[idCompra]) {
        acc[idCompra] = {
          idCompra,
          compra: {
            ...curr.compra.toJSON(),
            descuento_compra: formatCurrency(curr.compra.descuento_compra),
            iva_compra: formatCurrency(curr.compra.iva_compra),
            subtotal_compra: formatCurrency(curr.compra.subtotal_compra),
            total_compra: formatCurrency(curr.compra.total_compra),
          },
          insumos: [],
        };
      }

      acc[idCompra].insumos.push({
        NombreInsumos: curr.insumo
          ? curr.insumo.NombreInsumos
          : "Insumo eliminado",
        imagen: curr.insumo ? curr.insumo.Imagen : null,
        PrecioUnitario: formatCurrency(curr.precio_unitario),
        cantidad_insumo: curr.cantidad_insumo,
        totalValorInsumos: formatCurrency(curr.totalValorInsumos),
      });
      return acc;
    }, {});

    const resultado = Object.values(comprasAgrupadas);

    res.json(resultado);
  } catch (error) {
    console.error("Ocurrió un error al buscar el detalle de compra:", error);
    res.status(500).json({ error: "Hubo un error al procesar la solicitud" });
  }
}

module.exports = { listarDetalleCompras, BuscarDetalleCompraPorId };
