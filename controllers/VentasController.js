// VentasController.js
const ConexionDB = require('../Db/Conexion');


async function CrearVentas(DatosVentas) {
    try {
        const conexion = await ConexionDB();
        const query = 'INSERT INTO ventas (idServico, idCliente, idEmpleado, Iva, Subtotal, Fecha, Descuento, Total, Estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const { idServico, idCliente, idEmpleado, Iva, Subtotal, Fecha, Descuento, Total, Estado } = DatosVentas;
        const values = [idServico, idCliente, idEmpleado, Iva, Subtotal, Fecha, Descuento, Total, Estado];

        const [rows, fields] = await conexion.query(query, values);
        return rows.insertId;
    } catch (error) {
        console.log("OCURRIO UN ERROR AL CREAR LA VENTA: ", error);
        throw error;
    }
}
async function Listar_Ventas() {
    try {
        const conexion = await ConexionDB();
        const [rows, fields] = await conexion.query('SELECT * FROM ventas');
        return rows;
    } catch (error) {
        console.log("OCURRIO UN ERROR AL LISTAR LAS VENTAS: ", error);
        throw error;
    }
}

async function Anular(idventa, nuevoEstado) {
    try {
        const conexion = await ConexionDB();
        const [rows, fields] = await conexion.query('UPDATE ventas SET estado=? WHERE idVentas=?', [nuevoEstado, idventa]);
        return rows;
    } catch (error) {
        console.log("OCURRIO UN ERROR AL ANULAR LA VENTA: ", error);
        throw error;
    }
}

module.exports = {
    Listar_Ventas,
    Anular,
    CrearVentas
};
