const Insumo = require('../../models/insumos');

exports.guardarInsumo = async (req, res) => {
    console.log('Controlador guardarInsumo alcanzado');
    console.log('Cuerpo de la solicitud:', req.body);  

    try {
        let { NombreInsumos, Cantidad, usos_unitarios, PrecioUnitario, IdCategoria, Imagen } = req.body;

        console.log('Datos recibidos:', {
            NombreInsumos,
            Cantidad,
            usos_unitarios,
            PrecioUnitario,
            IdCategoria,
            Imagen:imagennPath
        });

        if (!NombreInsumos) {
            return res.status(400).json({ error: 'NombreInsumos es obligatorio.' });
        }

        const formatNombreInsumo = (nombre) => {
            return nombre
                .toLowerCase()
                .replace(/\b\w/g, (letra) => letra.toUpperCase());
        };

        NombreInsumos = formatNombreInsumo(NombreInsumos);

        const existingInsumo = await Insumo.findOne({ where: { NombreInsumos } });
        if (existingInsumo) {
            console.log('Insumo existente encontrado:', existingInsumo);
            return res.status(400).json({ error: 'El nombre del insumo ya está registrado.' });
        }

        let imagennPath = null;
        if (req.file){
            imagennPath = `/uploads/insumos/${req.file.filename}`;
        } else{
            return res.status(400).json({error: 'Es necesario subir la imagen del insumo.'})
        }

        let UsosDisponibles = Cantidad * usos_unitarios;
        console.log('UsosDisponibles calculado:', UsosDisponibles);

        let Estado = Cantidad > 0 ? 'Disponible' : 'Terminado';
        console.log('Estado determinado:', Estado);

        const nuevoInsumo = await Insumo.create({
            Imagen: imagennPath,
            NombreInsumos,
            Cantidad,
            usos_unitarios,
            PrecioUnitario,
            UsosDisponibles,
            Estado,
            IdCategoria,
            
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
