const Insumo = require('../../Models/insumos');
const path = require('path');
const fs = require('fs');

const MAX_FILE_SIZE = 1024 * 1024; 

const formatNombreInsumo = (nombre) => {
    const nombreSinEspacios = nombre.trim();
    const nombreMinusculas = nombreSinEspacios.toLowerCase();
    const nombreFormateado = nombreMinusculas.charAt(0).toUpperCase() + nombreMinusculas.slice(1);

    return nombreFormateado;
};

exports.guardarInsumo = async (req, res) => {
    console.log('Controlador guardar alcanzado');
    try {
        console.log("Body:", req.body);
        console.log("File:", req.file);

        let { NombreInsumos, Estado, IdCategoria, Idproveedor} = req.body;

        if (!NombreInsumos || !IdCategoria || !Idproveedor) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }

        NombreInsumos = formatNombreInsumo(NombreInsumos);

        const existingInsumo = await Insumo.findOne({ where: { NombreInsumos } });
        if (existingInsumo) {
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(400).json({ error: 'El nombre del insumo ya está registrado en la base de datos.' });
        }

        let imgPath = null;
        if (req.file) {
            if (req.file.size > MAX_FILE_SIZE) {
                fs.unlinkSync(req.file.path);
                return res.status(400).json({ error: 'El tamaño del archivo excede el límite permitido (1 MB).' });
            }
            imgPath = `/uploads/insumos/${req.file.filename}`;
        } else {
            return res.status(400).json({ error: 'Es necesario subir una imagen del insumo.' });
        }

        const Cantidad = 0;
        const PrecioUnitario = 0;
        Estado = Cantidad > 0 ? 'Disponible' : 'Agotado';

        const nuevoInsumo = await Insumo.create({
            Imagen: imgPath,
            NombreInsumos,
            Cantidad,
            PrecioUnitario,
            Estado,
            IdCategoria,
            Idproveedor
        });

        console.log('Insumo guardado:', nuevoInsumo);
        res.status(200).json({ Estado: 'guardado correctamente', insumo: nuevoInsumo });

    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const errores = error.errors.map(err => err.message);
            console.log('Errores de validación:', errores);
            return res.status(400).json({ errores });
        } else {
            console.error("Error al guardar el insumo", error);
            res.status(500).json({ error: 'Error al guardar el insumo' });
        }
    }
};

