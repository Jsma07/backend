const Categoria = require('../../../models/categorias');
const { Op } = require('sequelize');

const formatNombreCategoria = (nombre) => {
    const nombreSinEspacios = nombre.trim();
    const nombreMinusculas = nombreSinEspacios.toLowerCase();
    const nombreFormateado = nombreMinusculas.charAt(0).toUpperCase() + nombreMinusculas.slice(1);

    return nombreFormateado;
};

exports.editarCategoria = async (req, res) => {
    try {
        const { IdCategoria } = req.params;
        const { nombre_categoria, descripcion_categoria, estado_categoria } = req.body;

        const updateCategoria = await Categoria.findByPk(IdCategoria);
        if (!updateCategoria) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }

        if (nombre_categoria) {
            const formattedNombre = formatNombreCategoria(nombre_categoria);

            const existingCategoria = await Categoria.findOne({
                where: {
                    nombre_categoria: formattedNombre,
                    IdCategoria: {
                        [Op.ne]: IdCategoria
                    }
                }
            });

            if (existingCategoria) {
                return res.status(400).json({ error: 'El nombre de la categoría ya está registrado para otra categoría.' });
            }

            await updateCategoria.update({
                nombre_categoria: formattedNombre,
                descripcion_categoria: descripcion_categoria,
                estado_categoria: estado_categoria ?? updateCategoria.estado_categoria,
            });
        } else {
            await updateCategoria.update({
                estado_categoria: estado_categoria ?? updateCategoria.estado_categoria,
            });
        }

        res.status(200).json({ mensaje: 'Categoría actualizada correctamente', categoria: updateCategoria });
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const errores = error.errors.map(err => err.message);
            return res.status(400).json({ errores });
        } else {
            console.error("Error al editar la categoría", error);
            res.status(500).json({ error: 'Error al editar la categoría' });
        }
    }
};
