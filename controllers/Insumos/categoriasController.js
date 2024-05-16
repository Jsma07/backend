const ConexionDB = require('../../Db/Conexion');

exports.listarCategorias = async (req, res) => { 
    try {
        const connection = await ConexionDB(); 
        const [rows, fields] = await connection.query('SELECT * FROM categorias');
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error al buscar categorias", error);
        res.status(500).json({ error: 'Error al buscar categorias' });
    }
};

exports.guardarCategoria = async (req , res) => {
    try {
        const { nombre_categoria, estado_categoria } = req.body;
        const connection = await ConexionDB(); 
        // Verificar si la categoría ya existe en la base de datos
        const [existingRows] = await connection.query('SELECT * FROM categorias WHERE nombre_categoria = ?', [nombre_categoria]);
        if (existingRows.length > 0) {
            return res.status(400).json({ error: 'La categoría ya existe' });
        }
        // Si la categoría no existe, procede a guardarla 
        const query = 'INSERT INTO categorias (IdCategoria, imagen_categoria,nombre_categoria, estado_categoria) VALUES (?, ?, ?, ?)';
        const values = [IdCategoria, imagen_categoria,nombre_categoria, estado_categoria];
        await connection.query(query, values);
        res.status(200).json({ Estado: 'guardado correctamente' });
    } catch (error) {
        console.error("Error al guardar la categoria", error);
        res.status(500).json({ error: 'Error al guardar la categoria' });
    }
};

exports.obtenerCategoriaPorId = async (req, res) => {
    try {
        const { IdCategoria } = req.params;
        const connection = await ConexionDB(); 
        const [rows, fields] = await connection.query('SELECT * FROM categorias WHERE IdCategoria = ?', [IdCategoria]);
        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).json({ error: 'No se encontró un registro con el ID proporcionado', IdCategoria });
        }
    } catch (error) {
        console.error("Error al obtener la categoria por ID", error);
        res.status(500).json({ error: 'Error al obtener la categoria por ID' });
    }
};

exports.editarCategoria = async (req, res) => {
    try {
        const { IdCategoria, nombre_categoria, estado_categoria } = req.body;
        const connection = await ConexionDB(); 

        let query = 'SELECT * FROM categorias WHERE nombre_categoria = ? AND IdCategoria != ?';
        const values = [nombre_categoria, IdCategoria];
        const [existingRows] = await connection.query(query, values);

        if (existingRows.length > 0) {
            return res.status(400).json({ error: 'La categoría ya existe' });
        }

        query = 'UPDATE categorias SET nombre_categoria = ?, estado_categoria = ? WHERE IdCategoria = ?';
        const updateValues = [nombre_categoria, estado_categoria, IdCategoria];
        await connection.query(query, updateValues);

        res.status(200).json({ Estado: 'editado correctamente' });

        if (rows.length === 0) {
            res.status(404).json({ error: 'No se encontró un registro con el ID proporcionado', IdCategoria });
        } else {
            const query = 'UPDATE categorias SET imagen_categoria = ?, nombre_categoria = ?, estado_categoria = ? WHERE IdCategoria = ?';
            const values = [imagen_categoria, nombre_categoria, estado_categoria, IdCategoria];
            await connection.query(query, values);
            res.status(200).json({ Estado: 'editado correctamente' });
        }
    } catch (error) {
        console.error("Error al editar la categoria", error);
        res.status(500).json({ error: 'Error al editar la categoria' });
    }
};
