const Insumo = require('../../Models/insumos');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');

const formatNombreCategoria = (nombre) => {
    const nombreSinEspacios = nombre.trim();
    const nombreMinusculas = nombreSinEspacios.toLowerCase();
    const nombreFormateado = nombreMinusculas.charAt(0).toUpperCase() + nombreMinusculas.slice(1);

    return nombreFormateado;
};

exports.editarInsumo = async (req, res) => {
    try {
        const { IdInsumos } = req.params;
        const { NombreInsumos, Cantidad, Estado, Idcategoria, Idproveedor } = req.body;

        const formattedNombre = formatNombreCategoria(NombreInsumos);

        const existingInsumo = await Insumo.findOne({
            where: {
                NombreInsumos: formattedNombre,
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

        let updatedFields = { NombreInsumos: formattedNombre, Cantidad, Estado, Idcategoria, Idproveedor};

        if (req.file) {
            const newImagePath = `/uploads/insumos/${req.file.filename}`;
            updatedFields.Imagen = newImagePath;

            if (updateInsumo.Imagen) {
                const oldImagePath = path.join(__dirname, '../../', updateInsumo.Imagen);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
        }

        await updateInsumo.update(updatedFields);

        res.status(200).json({ mensaje: 'Insumo actualizado correctamente', insumo: updateInsumo });
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const errores = error.errors.map(err => err.message);
            return res.status(400).json({ errores });
        } else {
            console.error("Error al editar el insumo", error);
            res.status(500).json({ error: 'Error al editar el insumo' });
        }
    }
};
