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


async function Crearclientes(Datosclientes) {
    try {
        const conexion = await ConexionDB();
        const query = 'INSERT INTO clientes (Nombre, Apellido, Correo, Telefono, Estado, FotoPerfil, IdRol) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const { Nombre, Apellido, Correo, Telefono, Estado, FotoPerfil, IdRol} = Datosclientes;
        const values = [Nombre, Apellido, Correo, Telefono, Estado, FotoPerfil, IdRol];

        const [rows, fields] = await conexion.query(query, values);
        return rows.insertId;
    } catch (error) {
        console.log("OCURRIO UN ERROR AL CREAR El cliente: ", error);
        throw error;
    }
}

module.exports = {
    Listar_Clientes,
    Crearclientes
   
};
