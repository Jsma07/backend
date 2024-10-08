const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const path = require("path");
const fs = require("fs");
const multer = require("multer");

// Configuración de Multer para la subida de imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para cada archivo
  },
});

const upload = multer({ storage });

// Configuración de Multer específica para insumos
const storageInsumos = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uploads/insumos")); // Carpeta específica para imágenes de insumos
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para cada imagen
  },
});

const uploadInsumos = multer({ storage: storageInsumos });

// Configuración de Multer específica para adiciones
const storageAdiciones = multer.diskStorage({
  destination: function (req, file, cb) {
    const adicionesDir = path.join(__dirname, "uploads/Adiciones");

    // Verificar si la carpeta existe, si no, crearla
    if (!fs.existsSync(adicionesDir)) {
      fs.mkdirSync(adicionesDir, { recursive: true });
    }

    cb(null, adicionesDir); // Carpeta específica para imágenes de adiciones
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para cada imagen
  },
});

const uploadAdiciones = multer({ storage: storageAdiciones });

// Crear la carpeta de insumos si no existe
const insumosDir = path.join(__dirname, "uploads/insumos");
if (!fs.existsSync(insumosDir)) {
  fs.mkdirSync(insumosDir, { recursive: true });
}

// Importar y configurar las rutas
const PanelRoutes = require("./routes/panelRouter");
const usuarioRoutes = require("./routes/usuarioRoute");
const rolesRoutes = require("./routes/rolesRoutes");
const VentasRoutes = require("./routes/VentasRoutes");
const ClientesRouter = require("./routes/ClientesRouter");
const EmpleadosRoute = require("./routes/EmpleadosRoute");
const ProveedoresRouters = require("./routes/proveedoresRouter");
const ComprasRouters = require("./routes/comprasRouter");
const DetalleComprasRouters = require("./routes/detalleCompraRoute");
const InsumosRouters = require("./routes/insumosRouter")(uploadInsumos); // Usar el middleware de subida para insumos
const CategoriasRouters = require("./routes/categoriasRouter");
const DetalleventasRouter = require("./routes/DetalleventasRouter");
const ServiciosRouters = require("./routes/serviciosRouter")(upload); // Usar el middleware de subida para servicios
const AgendasRouters = require("./routes/AgendasRouter");
const LoginRoutes = require("./routes/loginRouter");

const horarioRouter = require("./routes/horarioRouter");
const adicionesrouter = require("./routes/adicionesrouter")(uploadAdiciones); // Usar el middleware de subida para adiciones
const Salida = require("./routes/Salida");
const transferAgendamientosToVentas = require("./Models/transferencia");

// Configuración del puerto
const PORT = process.env.PORT || 3000;

// Conectar con la base de datos
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

// Inicializar la conexión a la base de datos
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión a la base de datos establecida correctamente.");
  })
  .catch((err) => {
    console.error("Error al conectar con la base de datos:", err);
  });

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

// Configuración de archivos estáticos
app.use("/static", express.static("public/static"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(PanelRoutes);
app.use(usuarioRoutes);
app.use(LoginRoutes);
app.use(rolesRoutes);
app.use(VentasRoutes);
app.use(ClientesRouter);
app.use(EmpleadosRoute);
app.use(ProveedoresRouters);
app.use(ComprasRouters);
app.use(DetalleComprasRouters);
app.use(InsumosRouters); // Importar y usar las rutas de insumos con middleware de subida de imágenes
app.use(CategoriasRouters);
app.use(ServiciosRouters); // Importar y usar las rutas de servicios con middleware de subida de imágenes
app.use(AgendasRouters);
app.use(DetalleventasRouter);
app.use(horarioRouter);
app.use(adicionesrouter);
app.use(Salida);

// async function executeTransfer() {
//   try {
//     console.log("Ejecutando transferencia de agendamientos a ventas...");
//     await transferAgendamientosToVentas();
//   } catch (error) {
//     console.error("Error durante la ejecución de la transferencia:", error);
//   }
// }

// setInterval(executeTransfer, 50000);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Algo salió mal!");
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
