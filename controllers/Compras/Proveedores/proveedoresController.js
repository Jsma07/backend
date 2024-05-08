const ConexionDB = require('../../../Db/Conexion');

exports.listarProveedores = async (req, res) => { 
    try {
        const connection = await ConexionDB(); 
        const [rows, fields] = await connection.query('SELECT * FROM proveedores');
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error al buscar proveedores", error);
        res.status(500).json({ error: 'Error al buscar proveedores' });
    }
};

exports.guardarProveedor = async (req , res) => {
    try {
        const {IdProveedor, nombre_proveedor, correo_proveedor, telefono_proveedor, direccion_proveedor, empresa_proveedor, estado_proveedor} = req.body;
        const connection = await ConexionDB();
        const query = 'INSERT INTO proveedores (IdProveedor, nombre_proveedor, correo_proveedor, telefono_proveedor, direccion_proveedor, empresa_proveedor, estado_proveedor) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const values = [IdProveedor, nombre_proveedor, correo_proveedor, telefono_proveedor, direccion_proveedor, empresa_proveedor, estado_proveedor];
        await connection.query(query, values);
        res.status(200).json({ Estado: 'guardado correctamente' });
    } catch (error) {
        console.error("Error al guardar proveedor", error);
        res.status(500).json({ error: 'Error al guardar proveedor' });
    }
};

exports.obtenerProveedorPorId = async (req, res) => {
    try {
        const { IdProveedor } = req.params;
        const connection = await ConexionDB();
        const [rows, fields] = await connection.query('SELECT * FROM proveedores WHERE IdProveedor = ?', [IdProveedor]);
        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).json({ error: 'No se encontró un registro con el ID proporcionado', IdProveedor });
        }
    } catch (error) {
        console.error("Error al obtener proveedor por ID", error);
        res.status(500).json({ error: 'Error al obtener proveedor por ID' });
    }
};

exports.editarProveedor = async (req, res) => {
    try {
        const { IdProveedor, nombre_proveedor, correo_proveedor, telefono_proveedor, direccion_proveedor, empresa_proveedor, estado_proveedor } = req.body;
        const connection = await ConexionDB();
        const [rows, fields] = await connection.query('SELECT * FROM proveedores WHERE IdProveedor = ?', [IdProveedor]);
        if (rows.length === 0) {
            res.status(404).json({ error: 'No se encontró un registro con el ID proporcionado', IdProveedor });
        } else {
            const query = 'UPDATE proveedores SET nombre_proveedor = ?, correo_proveedor = ?, telefono_proveedor = ?, direccion_proveedor = ?, empresa_proveedor = ?, estado_proveedor = ? WHERE IdProveedor = ?';
            const values = [nombre_proveedor, correo_proveedor, telefono_proveedor, direccion_proveedor, empresa_proveedor, estado_proveedor, IdProveedor];
            await connection.query(query, values);
            res.status(200).json({ Estado: 'editado correctamente' });
        }
    } catch (error) {
        console.error("Error al editar proveedor", error);
        res.status(500).json({ error: 'Error al editar proveedor' });
    }
};

