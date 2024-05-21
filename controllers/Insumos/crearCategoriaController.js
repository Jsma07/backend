const Categoria = require('../../models/categorias');

exports.guardarCategoria = async (req, res) => {
    console.log('Controlador guardarCategoria alcanzado');
    try {
        const { nombre_categoria, estado_categoria } = req.body;

        // Verificar si el nombre de la categoría ya está registrado
        const existingCategoria = await Categoria.findOne({ where: { nombre_categoria } });
        if (existingCategoria) {
            return res.status(400).json({ error: 'El nombre de la categoría ya está registrado.' });
        }

        // Si todo está bien, proceder a guardar la categoría
        const nuevaCategoria = await Categoria.create({
            nombre_categoria,
            estado_categoria,
        });
        res.status(200).json({ Estado: 'guardado correctamente', categoria: nuevaCategoria });

    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            // Manejo de errores de validación de Sequelize
            const errores = error.errors.map(err => err.message);
            return res.status(400).json({ errores });
            
        } else {
            console.error("Error al guardar la categoria", error);
            res.status(500).json({ error: 'Error al guardar la categoria' });
        }
    }
};
