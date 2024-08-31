const express = require("express");
const router = express.Router();
const authorize = require("../middleware/auth");
const ClientesController = require("../controllers/Clientes/ClientesController");
const cambiarContrasenan = require("../controllers/Clientes/Contraseña");

const { recuperarContrasena } = require("../controllers/contrasena/mailer");

router.post("/api/recuperarContrasena", recuperarContrasena);

router.get("/jackenail/Listar_Clientes", async (req, res) => {
  try {
    const ventas = await ClientesController.Listar_Clientes();
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ message: "Error al listar los clietnes" });
  }
});

router.post("/Jackenail/RegistrarClientes", ClientesController.Crearclientes);

router.put(
  "/Jackenail/Actualizar/:idCliente",
  ClientesController.ActualizarCliente
);

router.put("/Jackenail/CambiarEstadocliente/:id", async (req, res) => {
  const idCliente = req.params.id;
  const nuevoEstado = req.body.Estado;

  try {
    const clienteActualizadoId = await ClientesController.cambiarEstadoCliente(
      idCliente,
      nuevoEstado
    );
    res.json({
      message: "Estado del cliente actualizado correctamente",
      id: clienteActualizadoId,
    });
  } catch (error) {
    console.error("Error al cambiar el estado del cliente:", error);
    res.status(500).json({ message: "Error al cambiar el estado del cliente" });
  }
});

router.put(
  "/Jackenail/CambiarContrasena/:idCliente",
  cambiarContrasenan.cambiarContrasena
);

module.exports = router;
