const express = require('express');
const app = express()
const cors = require('cors');
require('dotenv').config();
const usuarioRoutes = require('./routes/usuarioRoute');
const rolesRoutes = require('./routes/rolesRoutes')

const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST, 
  dialect: 'mysql'
});

const ConexionDB = require('./Db/Conexion')
const VentasRoutes = require('./routes/VentasRoutes');
const ClientesRouter=require('./routes/ClientesRouter')
const EmpleadosRoute=require('./routes/EmpleadosRoute')
const DetalleRouter=require('./routes/DetalleRouter')

const PORT = process.env.PORT 
app.use(cors());
app.use(express.urlencoded({extended : true}))

app.use(express.json());
// Configuración de archivos estáticos
app.use('/static', express.static('public/static'));

app.use(usuarioRoutes)
app.use(rolesRoutes)



  app.use(VentasRoutes)
  app.use(ClientesRouter)
  app.use(EmpleadosRoute)
  app.use(DetalleRouter)

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
