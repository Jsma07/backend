const Insumo = require('../../Models/insumos');
const Categoria = require('../../models/categorias'); 

exports.guardarInsumo = async (req, res) => {
    console.log('Controlador guardar alcanzado'); 
    try {
        let { NombreInsumos, Cantidad, usos_unitarios, PrecioUnitario, Estado, IdCategoria } = req.body;

        const formatNombreInsumo = (nombre) => {
            return nombre
                .toLowerCase() 
                .replace(/\b\w/g, (letra) => letra.toUpperCase()); 
        };

        NombreInsumos = formatNombreInsumo(NombreInsumos);
        
        const existingInsumo = await Insumo.findOne({ where: { NombreInsumos }});
        if (existingInsumo) {
            return res.status(400).json({ error: 'El nombre del insumo ya está registrado en la base de datos.' });
        }

        let imgennPath = null;
        if (req.file) {
            imgennPath = `/uploads/insumos/${req.file.filename}`; 
        } else {
            return res.status(400).json({ error: 'Es necesario subir una imagen del insumo.' });
        }
        
        let UsosDisponibles = Cantidad * usos_unitarios; 

        if (Cantidad > 0) {
            Estado = 'Disponible'
        }else{
            Estado = 'Terminado'
        }

        const nuevoInsumo = await Insumo.create({
            Imagen: imgennPath,
            NombreInsumos,
            Cantidad,
            usos_unitarios,
            PrecioUnitario,
            UsosDisponibles,
            Estado,
            IdCategoria
        });

        res.status(200).json({ Estado: 'guardado correctamente', insumo: nuevoInsumo });

    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const errores = error.errors.map(err => err.message);
            return res.status(400).json({ errores });
        } else {
            console.error("Error al guardar el insumo", error);
            res.status(500).json({ error: 'Error al guardar el insumo' });
        }
    }
};
