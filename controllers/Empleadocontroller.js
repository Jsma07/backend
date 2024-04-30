// VentasController.js
const ConexionDB = require('../Db/Conexion');


async function Listar_Empleados() {
    try {
        const conexion = await ConexionDB();
        const [rows, fields] = await conexion.query('SELECT * FROM empleados');
        return rows;
    } catch (error) {
        console.log("OCURRIO UN ERROR AL LISTAR LOS empleados: ", error);
        throw error;
    }
}


async function CrearEmpleados(DatosCrearEmpleados) {
    try {
        const conexion = await ConexionDB();
        const query = 'INSERT INTO empleados (Nombre, Apellido, Correo, Telefono, Estado, FotoPerfil, IdRol) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const { Nombre, Apellido, Correo, Telefono, Estado, FotoPerfil, IdRol} = DatosCrearEmpleados; // Corregido: DatosCrearEmpleados en lugar de Datosclientes
        const values = [Nombre, Apellido, Correo, Telefono, Estado, FotoPerfil, IdRol];

        const [rows, fields] = await conexion.query(query, values);
        return rows.insertId;
    } catch (error) {
        console.log("OCURRIO UN ERROR AL CREAR El empleados: ", error);
        throw error;
    }
}

module.exports = {
    Listar_Empleados,
    CrearEmpleados
   
};
