const Servicio = require('../../Models/servicios');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { error } = require('console');

// Tamaño máximo permitido en bytes (1 MB)
const MAX_FILE_SIZE = 2000000;

// Extensiones de archivo permitidas
const ALLOWED_EXTENSIONS = ['.png', '.jpg', '.jpeg'];

exports.editarServicio = async (req, res) => {
    try {
        const { IdServicio } = req.params;
        const { Nombre_Servicio, Precio_Servicio, Tiempo_Servicio, EstadoServicio, Descripcion_Servicio	 } = req.body;
        const file = req.file;
        const newImgPath = file ? `/uploads/${file.filename}` : null;

        // Validar si el archivo es una imagen permitida
        if (file) {
            const fileExtension = path.extname(file.originalname).toLowerCase();
            if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
                fs.unlinkSync(file.path);
                return res.status(400).json({ error: 'Solo se permiten imágenes en formato PNG, JPG o JPEG.' });
            }

            if (file.size > MAX_FILE_SIZE) {
                fs.unlinkSync(file.path);
                return res.status(400).json({ error: 'El tamaño de la imagen excede el límite permitido (1 MB).' });
            }
        }

        const servicio = await Servicio.findByPk(IdServicio);
        if (!servicio) {
            if (file) {
                fs.unlinkSync(file.path);
            }
            return res.status(400).json({ error: 'Servicio no encontrado' });
        }

        if (Nombre_Servicio) {
            const existingServicio = await Servicio.findOne({
                where: {
                    Nombre_Servicio,
                    IdServicio: { [Op.ne]: IdServicio }
                }
            });

            if (existingServicio) {
                if (file) {
                    fs.unlinkSync(file.path);
                }
                return res.status(400).json({ error: 'El nombre del Servicio ya está registrado para otro ID.' });
            }
        }

        if (file && servicio.ImgServicio) {
            const oldImgPath = path.join(__dirname, '../../', servicio.ImgServicio);
            fs.unlinkSync(oldImgPath);
        }

        await servicio.update({
            Nombre_Servicio: Nombre_Servicio ?? servicio.Nombre_Servicio,
            Precio_Servicio: Precio_Servicio ?? servicio.Precio_Servicio,
            Tiempo_Servicio: Tiempo_Servicio ?? servicio.Tiempo_Servicio,
            ImgServicio: newImgPath ?? servicio.ImgServicio,
            EstadoServicio: EstadoServicio ?? servicio.EstadoServicio,
            Descripcion_Servicio: Descripcion_Servicio ?? servicio.Descripcion_Servicio
        });

        res.status(200).json({ mensaje: 'Servicio actualizado correctamente', servicio });
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const errores = error.errors.map(err => err.message);
            return res.status(400).json({ errores });
        } else {
            console.error("Error al editar el servicio", error);
            res.status(500).json({ error: 'Error al editar el servicio' });
        }
    }
};
