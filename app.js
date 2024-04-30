const express = require('express');
const app = express()
const cors = require('cors');
require('dotenv').config();
const usuarioRoutes = require('./routes/usuarioRoute');
const rolesRoutes = require('./routes/rolesRoutes')

const PORT = process.env.PORT 
app.use(cors());
app.use(express.urlencoded({extended : true}))

app.use(express.json());
// Configuración de archivos estáticos
app.use('/static', express.static('public/static'));

app.use(usuarioRoutes)
app.use(rolesRoutes)


app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
