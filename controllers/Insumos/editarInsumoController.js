const Insumo = require("../../Models/insumos");
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");

const MAX_FILE_SIZE = 1000000;
// Función para formatear el nombre del insumo
const formatNombreInsumo = (nombre) => {
  const nombreSinEspacios = nombre.trim();
  const nombreMinusculas = nombreSinEspacios.toLowerCase();
  const nombreFormateado = nombreMinusculas.charAt(0).toUpperCase() + nombreMinusculas.slice(1);

  return nombreFormateado;
};

exports.editarInsumo = async (req, res) => {
  try {
    const { IdInsumos } = req.params;
    const { NombreInsumos, Cantidad, PrecioUnitario, Estado, estado_insumo, IdCategoria } =
      req.body;

    // Verificar si el nombre del insumo ya está registrado para otro insumo
    const existingInsumo = await Insumo.findOne({
      where: {
        NombreInsumos,
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

    const updateInsumo = await Insumo.findByPk(IdInsumos);

    if (!updateInsumo) {
      return res.status(404).json({ error: "Insumo no encontrado" });
    }

    // Construir objeto con los campos actualizados
    let updatedFields = {
      NombreInsumos,
      Cantidad,
      PrecioUnitario,
      Estado,
      estado_insumo,
      IdCategoria,
    };

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
    if (error.name === "SequelizeValidationError") {
      const errores = error.errors.map((err) => err.message);
      return res.status(400).json({ errores });
    } else {
      console.error("Error al editar el insumo", error);
      res.status(500).json({ error: "Error al editar el insumo" });
    }
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
