// VentasController.js
const empleado=require('../../Models/empleados')
const Rol = require('../../Models/roles'); 
const bcrypt = require('bcrypt');

async function Listar_Empleados() {
    try {
        const Empleados= await empleado.findAll();
        return Empleados;
    } catch (error) {
        console.log("OCURRIO UN ERROR AL LISTAR LOS empleados: ", error);
        throw error;
    }
}





async function crearEmpleado(req, res) {
    console.log('Controlador crearEmpleado alcanzado');
    try {
        // Extrae los datos del cuerpo de la solicitud
        let { Nombre, Apellido, Correo, Telefono, IdRol, Contrasena, Documento, Direccion, Estado } = req.body;

        // Formatea los datos
        Nombre = Nombre.trim().toLowerCase().charAt(0).toUpperCase() + Nombre.trim().toLowerCase().slice(1);
        Apellido = Apellido.trim().toLowerCase().charAt(0).toUpperCase() + Apellido.trim().toLowerCase().slice(1);
        Correo = Correo.trim().toLowerCase();
        Telefono = Telefono.trim();
        Documento = Documento.trim();
        Direccion = Direccion.trim();

        // Debug: Imprime los datos formateados
        console.log('Datos formateados:', { Nombre, Apellido, Correo, Telefono, IdRol, Documento, Direccion, Estado });

        // Debug: Imprime la contraseña antes de cifrarla
        console.log('Contraseña original:', Contrasena);

        // Cifra la contraseña
        const contrasenaCifrada = await bcrypt.hash(Contrasena, 10);

        // Debug: Imprime la contraseña cifrada
        console.log('Contraseña cifrada:', contrasenaCifrada);

        // Crea el nuevo empleado
        const nuevoEmpleado = await empleado.create({
            Nombre,
            Apellido,
            Correo,
            Telefono,
            IdRol,
            Contrasena: contrasenaCifrada,
            Estado,
            Documento,
            Direccion
        });

        // Debug: Imprime el empleado creado
        console.log('Nuevo empleado creado:', nuevoEmpleado);

        // Responde con el nuevo empleado creado
        res.status(201).json({ mensaje: 'Empleado creado correctamente', empleado: nuevoEmpleado });
    } catch (error) {
        // Debug: Imprime el error
        console.log('Error al crear empleado', error);
        res.status(500).json({ error: 'Hubo un error al crear el empleado. Por favor, inténtalo de nuevo más tarde.' });
    }
};



async function ActualizarEmpleado(idEmpleado, datosEmpleado) {
    try {
        const empleados = await empleado.findByPk(idEmpleado);
        if (!empleados) {
            throw new Error('Empleado no encontrado');
        }

        await empleados.update(datosEmpleado);
        return empleados.id; // o cualquier otro valor que desees devolver después de la actualización

    } catch (error) {
        console.error("Ocurrió un error al actualizar el empleado:", error);
        throw error;
    }
    
}

async function cambiarEstadoEmpleado(idEmpleado, nuevoEstado) {
    try {
        const empleados = await empleado.findByPk(idEmpleado);
        if (!empleados) {
            throw new Error('Empleado no encontrado');
        }

        empleados.Estado = nuevoEstado; 
        await empleados.save(); 

        return empleados.id;

    } catch (error) {
        console.error("Ocurrió un error al cambiar el estado del empleado:", error);
        throw error;
    }
}

module.exports = {
    Listar_Empleados,
    ActualizarEmpleado,
    cambiarEstadoEmpleado,
    crearEmpleado
    
   
};
