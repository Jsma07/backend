// VentasController.js
const ConexionDB = require('../Db/Conexion');


async function Listar_Clientes() {
    try {
        const conexion = await ConexionDB();
        const [rows, fields] = await conexion.query('SELECT * FROM clientes');
        return rows;
    } catch (error) {
        console.log("OCURRIO UN ERROR AL LISTAR LOS Clientes: ", error);
        throw error;
    }
}


async function Crearclientes(Datosactualizars) {
    try {
        const conexion = await ConexionDB();
        const query = 'INSERT INTO clientes (Nombre, Apellido, Correo, Telefono, Estado, FotoPerfil, IdRol) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const { Nombre, Apellido, Correo, Telefono, Estado, FotoPerfil, IdRol} = Datosactualizars;
        const values = [Nombre, Apellido, Correo, Telefono, Estado, FotoPerfil, IdRol];

        const [rows, fields] = await conexion.query(query, values);
        return rows.insertId;
    } catch (error) {
        console.log("OCURRIO UN ERROR AL CREAR El cliente: ", error);
        throw error;
    }
}


async function ActualizarCliente(idCliente, Datosactualizar){
    try{
        const conexion = await ConexionDB();
        const query = 'UPDATE Clientes SET Nombre =?, Apellido =?, Correo =?, Telefono =?, Estado =?, FotoPerfil =?, IdRol =? WHERE IdCliente =?';
        const values = [Datosactualizar.Nombre, Datosactualizar.Apellido, Datosactualizar.Correo, Datosactualizar.Telefono, Datosactualizar.Estado, Datosactualizar.FotoPerfil, Datosactualizar.IdRol, idCliente];
        const [rows, fields] = await conexion.query(query, values);
        return rows.affectedRows;

    }catch(error){
        console.log("OCURRIO UN ERROR AL ACTUALIZAR El cliente: ", error);
        throw error;
    }
    

}

async function Actualizarperfilfoto(idCliente, FotoPerfil){
    try {
        const conexion = await ConexionDB();
        const query = 'UPDATE Clientes SET FotoPerfil = ? WHERE IdCliente = ?';
        const values = [FotoPerfil, idCliente];
        const [rows, fields] = await conexion.query(query, values);
        return rows.affectedRows;
    } catch (error) {
        console.log("OCURRIO UN ERROR AL ACTUALIZAR El cliente: ", error);
        throw error;
    }
}

async function EliminarCliente(idCliente){
    try {
        const conexion = await ConexionDB();
        const query = 'DELETE FROM clientes WHERE IdCliente = ?';
        const [rows, fields] = await conexion.query(query, [idCliente]);
        return rows.affectedRows;
    } catch (error) {
        console.log("OCURRIO UN ERROR AL ELIMINAR El cliente: ", error);
        throw error;
    }
}



module.exports = {
    Listar_Clientes,
    Crearclientes,
    ActualizarCliente,
    Actualizarperfilfoto,
    EliminarCliente
   
};
