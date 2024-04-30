const express = require('express');
const app = express()
const cors = require('cors');
require('dotenv').config();
const usuarioRoutes = require('./routes/usuarioRoute');
const ConexionDB = require('./Db/Conexion')
const VentasRoutes = require('./routes/VentasRoutes');
const ClientesRouter=require('./routes/ClientesRouter')
const EmpleadosRoute=require('./routes/EmpleadosRoute')


const PORT = process.env.PORT 
app.use(cors());
app.use(express.urlencoded({extended : true}))

app.use(express.json());
// Configuración de archivos estáticos
app.use('/static', express.static('public/static'));

app.use(usuarioRoutes)


  app.use(VentasRoutes)
  app.use(ClientesRouter)
  app.use(EmpleadosRoute)


app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
