// app.js

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');
const fs = require('fs');

// Multer para la subida de imágenes
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para cada archivo
  },
});

const upload = multer({ storage });

// Multer para la subida de imágenes de insumos
const storageInsumos = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads/insumos')); // Carpeta para imágenes de insumos
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para cada imagen
  },
});

const uploadInsumos = multer({ storage: storageInsumos });

// Crear la carpeta si no existe
const insumosDir = path.join(__dirname, 'uploads/insumos');
if (!fs.existsSync(insumosDir)) {
  fs.mkdirSync(insumosDir, { recursive: true });
}

// Importar rutas
const usuarioRoutes = require('./routes/usuarioRoute');
const rolesRoutes = require('./routes/rolesRoutes');
const VentasRoutes = require('./routes/VentasRoutes');
const ClientesRouter = require('./routes/ClientesRouter');
const EmpleadosRoute = require('./routes/EmpleadosRoute');
const ProveedoresRouters = require('./routes/proveedoresRouter');
const ComprasRouters = require('./routes/comprasRouter');
const DetalleComprasRouters = require('./routes/detalleCompraRoute');
const InsumosRouters = require('./routes/insumosRouter'); // La importación correcta sin pasar `uploadInsumos` aquí
const CategoriasRouters = require('./routes/categoriasRouter');
const DetalleventasRouter = require('./routes/DetalleventasRouter');
const ServiciosRouters = require('./routes/serviciosRouter')(upload); // La importación correcta sin pasar `upload` aquí
const AgendasRouters = require('./routes/AgendasRouter');

// Configuración del puerto
const PORT = process.env.PORT || 3000;

// Conectar con la base de datos
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

// Inicializar la conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
  })
  .catch(err => {
    console.error('Error al conectar con la base de datos:', err);
  });

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

// Configuración de archivos estáticos
app.use('/static', express.static('public/static'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configurar las rutas
app.use(usuarioRoutes);
app.use(rolesRoutes);
app.use(VentasRoutes);
app.use(ClientesRouter);
app.use(EmpleadosRoute);
app.use(ProveedoresRouters);
app.use(ComprasRouters);
app.use(DetalleComprasRouters);
app.use(InsumosRouters); // Importar y usar las rutas de insumos sin argumentos
app.use(CategoriasRouters);
app.use(ServiciosRouters); // Importar y usar las rutas de servicios sin argumentos
app.use(AgendasRouters);
app.use(DetalleventasRouter);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
