// VentasController.js
const ConexionDB = require('../Db/Conexion');
const Cliente = require('../Models/clientes');


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
        const { Nombre, Apellido, Correo, Telefono, Estado, FotoPerfil, IdRol} = req.body;
        const nuevoCliente = await Cliente.create({
            Nombre, Apellido, Correo, Telefono, Estado, FotoPerfil, IdRol
        });
        
        console.log(Nombre);
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
            console.log("OCURRIO UN ERROR AL CREAR El cliente: ", error);
            res.status(500).json({ mensaje: 'Ocurrió un error al crear el cliente' });
        }
    }
}

async function ActualizarCliente(idCliente, datosActualizar) {
    try {
        // Validar que los datos a actualizar sean enteros si corresponden a campos numéricos
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
        const cliente = await Cliente.findByPk(idCliente);
        if (!cliente) {
            throw new Error('Cliente no encontrado');
        }

        cliente.Estado = nuevoEstado; 
        await cliente.save(); 

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
