const express = require("express");
const router = express.Router();

const {
  listarAdiciones,
  cambiarEstadoAdicion,
} = require("../controllers/Adiciones/listarAdiciones");
const {
  registrarAdicion,
} = require("../controllers/Adiciones/registrarAdicion");

module.exports = (uploadAdiciones) => {
  router.get("/Jackenail/Listarventas/adiciones", listarAdiciones);

  router.post(
    "/Jackenail/Registraradiciones",
    uploadAdiciones.single("Img"),
    registrarAdicion
  );

  router.put("/Jackenail/CambiaEstado/:id", cambiarEstadoAdicion);

  return router;
};
