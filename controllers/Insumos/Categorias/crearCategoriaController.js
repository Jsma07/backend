const Categoria = require('../../../models/categorias');

// Función para formatear el nombre de la categoría
const formatNombreCategoria = (nombre) => {
    // Eliminar espacios al inicio y al final del nombre
    const nombreSinEspacios = nombre.trim();
  
    // Aplicar formato de capitalización
    const nombreFormateado = nombreSinEspacios
      .toLowerCase()
      .replace(/\b\w/g, (letra) => letra.toUpperCase());
  
    return nombreFormateado;
};

exports.guardarCategoria = async (req, res) => {
    console.log('Controlador guardarCategoria alcanzado');
    try {
        let { nombre_categoria, estado_categoria } = req.body;

        // Aplicar formato al nombre de la categoría
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
