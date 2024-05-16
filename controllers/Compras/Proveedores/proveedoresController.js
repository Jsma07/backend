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

exports.guardarProveedor = async (req, res) => {
    try {
      const { nombre_proveedor, correo_proveedor, telefono_proveedor, direccion_proveedor, empresa_proveedor, estado_proveedor } = req.body;
      const connection = await ConexionDB();
  
      // Verificar si el correo electrónico ya está registrado
      const [existingCorreoRows] = await connection.query('SELECT * FROM proveedores WHERE correo_proveedor = ?', [correo_proveedor]);
      if (existingCorreoRows.length > 0) {
        return res.status(400).json({ error: 'El correo electrónico ya está registrado para otro proveedor.' });
      }
  
      // Verificar si el número de teléfono ya está registrado
      const [existingTelefonoRows] = await connection.query('SELECT * FROM proveedores WHERE telefono_proveedor = ?', [telefono_proveedor]);
      if (existingTelefonoRows.length > 0) {
        return res.status(400).json({ error: 'El número de teléfono ya está registrado para otro proveedor.' });
      }
  
      // Verificar si la dirección ya está registrada
      const [existingDireccionRows] = await connection.query('SELECT * FROM proveedores WHERE direccion_proveedor = ?', [direccion_proveedor]);
      if (existingDireccionRows.length > 0) {
        return res.status(400).json({ error: 'La dirección ya está registrada para otro proveedor.' });
      }
  
      // Verificar si la empresa ya está registrada
      const [existingEmpresaRows] = await connection.query('SELECT * FROM proveedores WHERE empresa_proveedor = ?', [empresa_proveedor]);
      if (existingEmpresaRows.length > 0) {
        return res.status(400).json({ error: 'La empresa ya está registrada para otro proveedor.' });
      }
  
      // Si todo está bien, proceder a guardar el proveedor
      const query = 'INSERT INTO proveedores (nombre_proveedor, correo_proveedor, telefono_proveedor, direccion_proveedor, empresa_proveedor, estado_proveedor) VALUES (?, ?, ?, ?, ?, ?)';
      const values = [nombre_proveedor, correo_proveedor, telefono_proveedor, direccion_proveedor, empresa_proveedor, estado_proveedor];
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

      let query = 'SELECT * FROM proveedores WHERE correo_proveedor = ? AND IdProveedor != ?';
      let values = [correo_proveedor, IdProveedor];
      let [existingCorreoRows] = await connection.query(query, values);
      if (existingCorreoRows.length > 0) {
          return res.status(400).json({ error: 'El correo electrónico ya está registrado para otro proveedor.' });
      }

      query = 'SELECT * FROM proveedores WHERE telefono_proveedor = ? AND IdProveedor != ?';
      values = [telefono_proveedor, IdProveedor];
      let [existingTelefonoRows] = await connection.query(query, values);
      if (existingTelefonoRows.length > 0) {
          return res.status(400).json({ error: 'El número de teléfono ya está registrado para otro proveedor.' });
      }

      query = 'SELECT * FROM proveedores WHERE direccion_proveedor = ? AND IdProveedor != ?';
      values = [direccion_proveedor, IdProveedor];
      let [existingDireccionRows] = await connection.query(query, values);
      if (existingDireccionRows.length > 0) {
          return res.status(400).json({ error: 'La dirección ya está registrada para otro proveedor.' });
      }

      query = 'SELECT * FROM proveedores WHERE empresa_proveedor = ? AND IdProveedor != ?';
      values = [empresa_proveedor, IdProveedor];
      let [existingEmpresaRows] = await connection.query(query, values);
      if (existingEmpresaRows.length > 0) {
          return res.status(400).json({ error: 'La empresa ya está registrada para otro proveedor.' });
      }

      // Si no hay conflictos, proceder con la actualización del proveedor
      query = 'UPDATE proveedores SET nombre_proveedor = ?, correo_proveedor = ?, telefono_proveedor = ?, direccion_proveedor = ?, empresa_proveedor = ?, estado_proveedor = ? WHERE IdProveedor = ?';
      values = [nombre_proveedor, correo_proveedor, telefono_proveedor, direccion_proveedor, empresa_proveedor, estado_proveedor, IdProveedor];
      await connection.query(query, values);

      res.status(200).json({ Estado: 'editado correctamente' });
  } catch (error) {
      console.error("Error al editar proveedor", error);
      res.status(500).json({ error: 'Error al editar proveedor' });
  }
};


