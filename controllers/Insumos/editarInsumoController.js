const Insumo = require('../../models/insumos');
const Categoria = require('../../models/categorias'); 
const { Op } = require('sequelize');

exports.editarInsumo = async (req, res) => {
    try {
        const { IdInsumos } = req.params;
        const { NombreInsumos, Imagen, Cantidad, PrecioUnitario, Estado, IdCategoria } = req.body;

        // Verificar si el nombre del insumo ya está registrado para otro insumo
        const existingInsumo = await Insumo.findOne({
            where: {
                NombreInsumos,
                IdInsumos: {
                    [Op.ne]: IdInsumos
                }
            }
        });
        if (existingInsumo) {
            return res.status(400).json({ error: 'El nombre del insumo ya está registrado para otro insumo.' });
        }

        const updateInsumo = await Insumo.findByPk(IdInsumos);
        if (!updateInsumo) {
            return res.status(404).json({ error: 'Insumo no encontrado' });
        }

        await updateInsumo.update({
            NombreInsumos,
            Imagen,
            PrecioUnitario,
            Estado,
            IdCategoria
        });

        res.status(200).json({ mensaje: 'Insumo actualizado correctamente', insumo: updateInsumo });
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            // Manejo de errores de validación de Sequelize
            const errores = error.errors.map(err => err.message);
            return res.status(400).json({ errores });
        } else {
            console.error("Error al editar el insumo", error);
            res.status(500).json({ error: 'Error al editar el insumo' });
        }
    }
};
