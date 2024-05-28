const Categoria = require('../../../models/categorias');
const { Op } = require('sequelize');

exports.editarCategoria = async (req, res) => {
    try {
        const { IdCategoria } = req.params;
        const { nombre_categoria, estado_categoria } = req.body;

        // Verificar si el nombre de la categoría ya está registrado para otra categoría
        const existingCategoria = await Categoria.findOne({
            where: {
                nombre_categoria,
                IdCategoria: {
                    [Op.ne]: IdCategoria
                }
            }
        });
        if (existingCategoria) {
            return res.status(400).json({ error: 'El nombre de la categoría ya está registrado para otra categoría.' });
        }

        const updateCategoria = await Categoria.findByPk(IdCategoria);
        if (!updateCategoria) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }

        await updateCategoria.update({
            nombre_categoria,
            estado_categoria,
        });

        res.status(200).json({ mensaje: 'Categoría actualizada correctamente', categoria: updateCategoria });
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            // Manejo de errores de validación de Sequelize
            const errores = error.errors.map(err => err.message);
            return res.status(400).json({ errores });
        } else {
            console.error("Error al editar la categoría", error);
            res.status(500).json({ error: 'Error al editar la categoría' });
        }
    }
};
