const express = require("express");
const router = express.Router();
const authorize = require("../middleware/auth");
const listarRol = require("../controllers/Roles/listaRolController");
const crearRol = require("../controllers/Roles/crearRolController");
const {
  editarRol,
  traerRol,
} = require("../controllers/Roles/editarRolController");
const permisos = require("../controllers/permisos/listarPermisosController");

router.get("/api/roles", authorize(["Configuracion"]), listarRol.listarRoles);
router.post(
  "/api/roles/crearRol",
  authorize(["Configuracion"]),
  crearRol.crearRol
);
router.get(
  "/api/permisos",
  authorize(["Configuracion"]),
  permisos.listarPermisos
);
router.put("/api/editarRol/:id", authorize(["Configuracion"]), editarRol);
router.get("/api/rol/:id", authorize(["Configuracion"]), traerRol);
module.exports = router;
