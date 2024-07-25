// VentasController.js
const Cliente = require('../models/clientes');


async function Listar_Clientes() {
    try {
        const clientes = await Cliente.findAll();
        return clientes;
    } catch (error) {
        console.log("Ocurrió un error al listar los clientes: ", error);
        throw error;
    }
}

async function Crearclientes(req, res) {
    try {
      const datosCrearClientes = req.body;
      const nuevoCliente = await Cliente.create(datosCrearClientes);
      res.status(201).json({ mensaje: 'Cliente creado', cliente: nuevoCliente });
    } catch (error) {
      // Manejar el error de validación
      if (error.name === 'SequelizeValidationError') {
        const errores = error.errors.map(err => ({
          campo: err.path,
          mensaje: err.message
        }));
        res.status(400).json({ mensaje: 'Error de validación', errores });
      } else {
        console.log("OCURRIO UN ERROR AL CREAR EL CLIENTE: ", error);
        res.status(500).json({ mensaje: 'Ocurrió un error al crear el cliente' });
      }
    }
  }

async function ActualizarCliente(idCliente, datosActualizar) {
    try {
        if (datosActualizar.Estado && !Number.isInteger(datosActualizar.Estado)) {
            throw new Error('El campo Estado debe ser un número entero');
        }
        const cliente = await Cliente.findByPk(idCliente);
        if (!cliente) {
            throw new Error('Cliente no encontrado');
        }

        await cliente.update(datosActualizar);
        return cliente.id; 

    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const errores = error.errors.map(err => ({
                campo: err.path,
                mensaje: err.message
            }));
            res.status(400).json({ mensaje: 'Error de validación', errores });
        } else {
            console.log("OCURRIO UN ERROR AL CREAR El cliente: ", error);
            res.status(500).json({ mensaje: 'Ocurrió un error al crear el cliente' });
        }
    }
}
async function cambiarEstadoCliente(idCliente, nuevoEstado) {
    try {
        // Verificar si el cliente existe
        const cliente = await Cliente.findByPk(idCliente);
        if (!cliente) {
            throw new Error('Cliente no encontrado');
        }

        // Actualizar el estado del cliente
        cliente.Estado = nuevoEstado;
        await cliente.save();

        console.log("Estado del cliente actualizado correctamente:", cliente.id);
        return cliente.id;

    } catch (error) {
        console.error("Ocurrió un error al cambiar el estado del cliente:", error);
        throw error;
    }
}

module.exports = {
    Listar_Clientes,
    Crearclientes,
    ActualizarCliente,
    cambiarEstadoCliente,
    
};