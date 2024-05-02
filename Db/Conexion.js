// ConexionDB.js
const mysql = require("mysql2/promise");
require('dotenv').config();

async function ConexionDB() {
    try {
        const connect = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE, // Agrega esta línea para especificar la base de datos
            port: process.env.DB_PORT
        });
        console.log("Conexion exitosa a la base de datos");
        return connect;
    } catch (error) {
        console.error("Error al conectarse a la base de datos", error);
        throw error;
    }
}

module.exports = ConexionDB;
