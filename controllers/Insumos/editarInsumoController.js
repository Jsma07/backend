const Insumo = require("../../Models/insumos");
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");

// Tamaño máximo permitido en bytes (2 MB)
const MAX_FILE_SIZE = 2000000;

// Extensiones de archivo permitidas
const ALLOWED_EXTENSIONS = ['.png', '.jpg', '.jpeg'];

const formatNombreCategoria = (nombre) => {
  const nombreSinEspacios = nombre.trim();
  const nombreMinusculas = nombreSinEspacios.toLowerCase();
  const nombreFormateado =
    nombreMinusculas.charAt(0).toUpperCase() + nombreMinusculas.slice(1);

  return nombreFormateado;
};

exports.editarInsumo = async (req, res) => {
  try {
    const { IdInsumos } = req.params;
    const { NombreInsumos, Cantidad, PrecioUnitario, Estado, IdCategoria } = req.body;
    const file = req.file;
    const newImgPath = file ? `/uploads/insumos/${file.filename}` : null;

    // Validar si el archivo es una imagen permitida
    if (file) {
      const fileExtension = path.extname(file.originalname).toLowerCase();
      if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
        fs.unlinkSync(file.path);
        return res.status(400).json({ error: 'Solo se permiten imágenes en formato PNG, JPG o JPEG.' });
      }

      if (file.size > MAX_FILE_SIZE) {
        fs.unlinkSync(file.path);
        return res.status(400).json({ error: 'El tamaño de la imagen excede el límite permitido (2 MB).' });
      }
    }

    const existingInsumo = await Insumo.findOne({
      where: {
        NombreInsumos,
        IdInsumos: { [Op.ne]: IdInsumos }
      }
    });

    if (existingInsumo) {
      if (file) {
        fs.unlinkSync(file.path);
      }
      return res.status(400).json({ error: 'El nombre del insumo ya está registrado para otro insumo.' });
    }

    const updateInsumo = await Insumo.findByPk(IdInsumos);
    if (!updateInsumo) {
      if (file) {
        fs.unlinkSync(file.path);
      }
      return res.status(404).json({ error: 'Insumo no encontrado' });
    }

    // Eliminar la imagen anterior si existe y se está cargando una nueva
    if (file && updateInsumo.Imagen) {
      const oldImgPath = path.join(__dirname, '../../', updateInsumo.Imagen);
      if (fs.existsSync(oldImgPath)) {
        fs.unlinkSync(oldImgPath);
      }
    }

    // Construir objeto con los campos actualizados
    let updatedFields = {
      NombreInsumos: NombreInsumos ?? updateInsumo.NombreInsumos,
      Cantidad: Cantidad ?? updateInsumo.Cantidad,
      PrecioUnitario: PrecioUnitario ?? updateInsumo.PrecioUnitario,
      Estado: Estado ?? updateInsumo.Estado,
      IdCategoria: IdCategoria ?? updateInsumo.IdCategoria,
      Imagen: newImgPath ?? updateInsumo.Imagen
    };

    // Actualizar el insumo con los campos actualizados
    await updateInsumo.update(updatedFields);

    res.status(200).json({
      mensaje: 'Insumo actualizado correctamente',
      insumo: updateInsumo
    });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      // Manejo de errores de validación de Sequelize
      const errores = error.errors.map(err => err.message);
      return res.status(400).json({ errores });
    } else {
      console.error('Error al editar el insumo', error);
      res.status(500).json({ error: 'Error al editar el insumo' });
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
      return res.status(400).json({ error: 'Cantidad no válida' });
    }

    const updateInsumo = await Insumo.findByPk(IdInsumos);
    if (!updateInsumo) {
      return res.status(404).json({ error: 'Insumo no encontrado' });
    }

    await updateInsumo.update({
      Cantidad: parseFloat(Cantidad) // Asegúrate de que Cantidad sea un número flotante
    });

    res.status(200).json({
      mensaje: 'Insumo actualizado correctamente',
      insumo: updateInsumo
    });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      // Manejo de errores de validación de Sequelize
      const errores = error.errors.map(err => err.message);
      return res.status(400).json({ errores });
    } else {
      console.error('Error al editar el insumo', error);
      res.status(500).json({ error: 'Error al editar el insumo' });
    }
  }
};
