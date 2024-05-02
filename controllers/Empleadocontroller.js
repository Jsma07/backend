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

async function ActualizarEmpleado(idEmpleado, DatosEmpledo){
    try{
        const conexion = await ConexionDB();
        const query = 'UPDATE empleados SET Nombre =?, Apellido =?, Correo =?, Telefono =?, Estado =?, FotoPerfil =?, IdRol =? WHERE IdEmpleado =?';
        const values = [DatosEmpledo.Nombre, DatosEmpledo.Apellido, DatosEmpledo.Correo, DatosEmpledo.Telefono, DatosEmpledo.Estado, DatosEmpledo.FotoPerfil, DatosEmpledo.IdRol, idEmpleado];
        const [rows, fields] = await conexion.query(query, values);
        return rows.affectedRows;

    }catch(error){
        console.log("OCURRIO UN ERROR AL ACTUALIZAR El empleados: ", error);
        throw error;
    }

}
async function EliminarEmpleado(idEmpleado){
    try {
        const conexion = await ConexionDB();
        const query = 'DELETE FROM empleados WHERE IdEmpleado = ?';
        const [rows, fields] = await conexion.query(query, [idEmpleado]); // Usando el parámetro idEmpleado
        return rows.affectedRows;
    } catch (error) {
        console.log("OCURRIO UN ERROR AL ELIMINAR El empleado: ", error);
        throw error;
    }
}



module.exports = {
    Listar_Empleados,
    CrearEmpleados,
    ActualizarEmpleado,
    EliminarEmpleado
   
};
