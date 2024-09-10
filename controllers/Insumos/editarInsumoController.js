const Insumo = require("../../Models/insumos");
const Detallecompra = require("../../Models/detallecompra"); // Asegúrate de tener este modelo si es necesario
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");

const MAX_FILE_SIZE = 1000000;

const formatNombreInsumo = (nombre) => {
  const nombreSinEspacios = nombre.trim();
  const nombreMinusculas = nombreSinEspacios.toLowerCase();
  return nombreMinusculas.charAt(0).toUpperCase() + nombreMinusculas.slice(1);
};

exports.editarInsumo = async (req, res) => {
  try {
    console.log('req.body:', req.body); // Log para depuración
    const { IdInsumos } = req.params;
    const { NombreInsumos, Cantidad, PrecioUnitario, Estado, estado_insumo, IdCategoria } = req.body;

    if (!IdInsumos) {
      return res.status(400).json({ error: "Faltan parámetros requeridos." });
    }

    console.log('IdInsumos:', IdInsumos); // Log para depuración

    const updateInsumo = await Insumo.findByPk(IdInsumos);
    if (!updateInsumo) {
      return res.status(404).json({ error: "Insumo no encontrado" });
    }

    // Verificar si el insumo está asociado con alguna compra
    const asociadoDetalleCompras = await Detallecompra.findOne({
      where: {
        IdInsumo: IdInsumos,
      },
    });

    console.log('asociadoDetalleCompras:', asociadoDetalleCompras); // Log para depuración

    // Validar si se puede inactivar el estado
    if (estado_insumo === 0) {
      if (asociadoDetalleCompras) {
        return res.status(400).json({ error: "No se puede inactivar este insumo porque está asociado a una compra." });
      }
      if (updateInsumo.Cantidad > 0) {
        return res.status(400).json({ error: "No se puede inactivar este insumo porque su cantidad es mayor a 0." });
      }
    }

    // Construir objeto con los campos actualizados
    let updatedFields = {};

    if (NombreInsumos) {
      const nombreFormateado = formatNombreInsumo(NombreInsumos);

      // Verificar si el nombre del insumo ya está registrado para otro insumo
      const existingInsumo = await Insumo.findOne({
        where: {
          NombreInsumos: nombreFormateado,
          IdInsumos: {
            [Op.ne]: IdInsumos,
          },
        },
      });

      if (existingInsumo) {
        return res.status(400).json({
          error: "El nombre del insumo ya está registrado para otro insumo.",
        });
      }

      updatedFields.NombreInsumos = nombreFormateado;
    }

    if (Cantidad !== undefined) updatedFields.Cantidad = Cantidad;
    if (PrecioUnitario !== undefined) updatedFields.PrecioUnitario = PrecioUnitario;
    if (Estado !== undefined) updatedFields.Estado = Estado;
    if (estado_insumo !== undefined) updatedFields.estado_insumo = estado_insumo;
    if (IdCategoria !== undefined) updatedFields.IdCategoria = IdCategoria;

    // Verificar si se subió una nueva imagen
    if (req.file) {
      if (req.file.size > MAX_FILE_SIZE) {
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ error: 'El tamaño del archivo excede el límite permitido (1 MB).' });
      }

      const newImagePath = `/uploads/insumos/${req.file.filename}`;
      updatedFields.Imagen = newImagePath;

      // Eliminar la imagen anterior si existe
      if (updateInsumo.Imagen) {
        const oldImagePath = path.join(__dirname, "../../", updateInsumo.Imagen);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }

    // Actualizar el insumo con los campos actualizados
    await updateInsumo.update(updatedFields);

    res.status(200).json({
      mensaje: "Insumo actualizado correctamente",
      insumo: updateInsumo,
    });
  } catch (error) {
    console.error("Error al editar el insumo", error);
    res.status(500).json({ error: "Error al editar el insumo" });
  }
};



// Controlador para actualizar las existencias de un insumo
exports.existenciaseditar = async (req, res) => {
  try {
    const { IdInsumos } = req.params;
    const { Cantidad } = req.body;

    // Validar que Cantidad sea un número válido
    if (isNaN(Cantidad)) {
      return res.status(400).json({ error: "Cantidad no válida" });
    }

    const updateInsumo = await Insumo.findByPk(IdInsumos);
    if (!updateInsumo) {
      return res.status(404).json({ error: "Insumo no encontrado" });
    }

    await updateInsumo.update({
      Cantidad: parseFloat(Cantidad), // Asegúrate de que Cantidad sea un número flotante
    });

    res.status(200).json({
      mensaje: "Insumo actualizado correctamente",
      insumo: updateInsumo,
    });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      // Manejo de errores de validación de Sequelize
      const errores = error.errors.map((err) => err.message);
      return res.status(400).json({ errores });
    } else {
      console.error("Error al editar el insumo", error);
      res.status(500).json({ error: "Error al editar el insumo" });
    }
  }
};
