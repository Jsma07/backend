// Detalle ventas controlador.js
const ConexionDB = require('../Db/Conexion');



async function Creardetalleventas(DetalleVentas) {
    try {
        const conexion = await ConexionDB();
        const query = 'INSERT INTO detalleventas (Idventa, Idinsumo, Usos, Precio_unitario) VALUES (?, ?, ?, ?)';
        const { Idventa, Idinsumo, Usos, Precio_unitario } = DetalleVentas;
        const values = [Idventa, Idinsumo, Usos, Precio_unitario]; // Cambié a un array para los valores
        const [result, fields] = await conexion.query(query, values);

        if (result.affectedRows === 1) {
            return result.insertId; // Retorna el ID del detalle de venta insertado
        } else {
            throw new Error('No se pudo insertar el detalle de venta');
        }
    } catch (error) {
        console.log("OCURRIO UN ERROR AL CREAR EL DETALLE DE LA VENTA: ", error);
        throw error;
    }
}

// se utiliza una funcion asincrona para traer de la base de datos 
// los campos de la tabla listar
async function DetalleVentas() {
    try {
        // se crea una conexion a la base de datos  y luego la llamamos como un objeto 
        // se utiliza await para que se espere a que se cargue la conexion
        const conexion = await ConexionDB();
        const [rows, fields] = await conexion.query('SELECT * FROM detalleventas');
        return rows;
    } catch (error) {
        console.log("OCURRIO UN ERROR AL LISTAR LAS VENTAS: ", error);
        throw error;
    }
}

module.exports={
    DetalleVentas,
    Creardetalleventas,
}