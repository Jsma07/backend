const ConexionDB = require('../Db/Conexion');

exports.listarProveedores = (req, res) => { 
    ConexionDB.query('SELECT * FROM Proveedores', (err, rows, fields)=>{
        if(!err){
            res.status(200).json(rows);
        }else {
            res.status(500).json({ error: 'Error al buscar' });
        }
    })
};

exports.guardarProveedor = (req , res)=>{
    const {idProveedor, nombre_proveedor, correo_proveedor, telefono_proveedor, direccion_proveedor, empresa_proveedor} = req.body;
    const query = 'INSERT INTO Proveedores (idProveedor,nombre_proveedor,correo_proveedor,telefono_proveedor,direccion_proveedor,empresa_proveedor) VALUES (?,?,?,?)';
    const values = [idProveedor, nombre_proveedor, correo_proveedor, telefono_proveedor, direccion_proveedor, empresa_proveedor];
    ConexionDB.query(query, values, (err,rows, fields)=>{
        if (!err) {
            res.status(200).json({'Estado': 'guardado correctamente'});
          } else {
            res.status(500).json({ 'error': 'Error al guardar' });
          }
    })
};

exports.obtenerProveedorPorId = (req, res) => {
    const { idProveedor } = req.params;
    ConexionDB.query('SELECT * FROM Proveedores WHERE idProveedor = ?', [idProveedor], (err, rows, fields) => {
      if (!err) {
        if (rows.length > 0) {
          res.status(200).json(rows[0]);
        } else {
          res.status(404).json({ error: 'No se encontró un registro con el ID proporcionado',idProveedor});
        }
      } else {
        res.status(500).json({ error: 'Error al buscar' });
      }
    });
};

exports.editarProveedor = (req, res) => {
    const {idProveedor, nombre_proveedor, correo_proveedor, telefono_proveedor, direccion_proveedor, empresa_proveedor} = req.body;
  
    ConexionDB.query('SELECT * FROM Proveedores WHERE idProveedor = ?', [idProveedor], (erorr, Rows) => {
      if (erorr) {
        res.status(500).json({ error: 'Error al verificar el ID' , idProveedor});
      } else if (Rows.length === 0) {
        res.status(404).json({ error: 'No se encontró un registro con el ID proporcionado' , idProveedor});
      } else {
        const query = 'UPDATE Proveedores SET nombre_proveedor = ?, correo_proveedor = ?, telefono_proveedor = ?, direccion_proveedor = ?, empresa_proveedor = ? WHERE idProveedor = ?';
  
        const values = [nombre_proveedor, correo_proveedor, telefono_proveedor, direccion_proveedor, empresa_proveedor, idProveedor];
  
        ConexionDB.query(query, values, (updateErr, updateRow) => {
          if (!updateErr) {
            res.status(200).json({ Estado: 'editado correctamente' });
          } else {
            res.status(500).json({ error: 'Error al editar' });
          }
        });
      }
    });
};
