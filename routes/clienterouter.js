const express = require("express");
const router = express.Router();
const { Crearclientes, ActualizarCliente } = require("../controllers/Clientes/Crearcliente");
const { VerificarCodigo } = require("../controllers/Clientes/Verificacion");

module.exports = (uploadClientes) => {

  router.post(
    "/Jackenail/crearClientesedu",
    uploadClientes.single("Img"), 
    Crearclientes
  );

  router.put(
    "/Jackenail/actualizarClientes/:id",
    uploadClientes.single("Img"),
    ActualizarCliente
  );

  router.post(
    "/Jackenail/verificarCodigo",
    VerificarCodigo
  );

  return router;
};
