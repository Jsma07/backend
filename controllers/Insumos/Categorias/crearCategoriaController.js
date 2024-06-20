const Categoria = require('../../../models/categorias');

exports.guardarCategoria = async (req, res) => {
    console.log('Controlador guardarCategoria alcanzado');
    try {
        let { nombre_categoria, estado_categoria } = req.body;

        const formatNombreCategoria = (nombre) => {
            return nombre
                .toLowerCase() 
                .replace(/\b\w/g, (letra) => letra.toUpperCase()); 
        };

        nombre_categoria = formatNombreCategoria(nombre_categoria);

        const existingCategoria = await Categoria.findOne({ where: { nombre_categoria } });
        if (existingCategoria) {
            return res.status(400).json({ error: 'El nombre de la categoría ya está registrado.' });
        }

        const nuevaCategoria = await Categoria.create({
            nombre_categoria,
            estado_categoria,
        });
        res.status(200).json({ Estado: 'guardado correctamente', categoria: nuevaCategoria });

    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const errores = error.errors.map(err => err.message);
            return res.status(400).json({ errores });

        } else {
            console.error("Error al guardar la categoria", error);
            res.status(500).json({ error: 'Error al guardar la categoria' });
        }
    }
};
