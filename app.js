const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');

//---------MULTER IMAGE ---------------------------
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb){
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre de cada archivo sea unico
  },
});

const upload = multer({ storage})


// app.post('/api/upload', upload.single('file'), (req, res) => {
//   res.json(req.file)
// });



//----------------------------------------------------------
const usuarioRoutes = require('./routes/usuarioRoute');
const rolesRoutes = require('./routes/rolesRoutes');
// const uploadRoutes = require('./routes/uploadRoutes');  
const VentasRoutes = require('./routes/VentasRoutes');
const ClientesRouter = require('./routes/ClientesRouter');
const EmpleadosRoute = require('./routes/EmpleadosRoute');
const DetalleRouter = require('./routes/DetalleRouter');
const ProveedoresRouters = require('./routes/proveedoresRouter');
const ComprasRouters = require('./routes/comprasRouter');
const InsumosRouters = require('./routes/insumosRouter');
const CategoriasRouters = require('./routes/categoriasRouter');
const ServiciosRouters = require('./routes/serviciosRouter')(upload);
const AgendasRouters = require('./routes/AgendasRouter');

const PORT = process.env.PORT;

const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

const ConexionDB = require('./Db/Conexion');
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

// Configuración de archivos estáticos
app.use('/static', express.static('public/static'));
// app.use('/uploads', express.static('public/uploads'));  // Nueva configuración de archivos estáticos

// 

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(usuarioRoutes);
app.use(rolesRoutes);
// app.use(uploadRoutes);  // Usar la nueva ruta
app.use(ProveedoresRouters);
app.use(ComprasRouters);
app.use(InsumosRouters);
app.use(CategoriasRouters);
app.use(ServiciosRouters);
app.use(AgendasRouters);
app.use(VentasRoutes);
app.use(ClientesRouter);
app.use(EmpleadosRoute);
app.use(DetalleRouter);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
  })
  .catch(err => {
    console.error('Error al conectar con la base de datos:', err);
  });

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
