// VentasController.js
const ConexionDB = require('../Db/Conexion');
const empleado=require('../Models/empleados')

async function Listar_Empleados() {
    try {
        const Empleados= await empleado.findAll();
        return Empleados;
    } catch (error) {
        console.log("OCURRIO UN ERROR AL LISTAR LOS empleados: ", error);
        throw error;
    }
}

async function CrearEmpleados(DatosCrearEmpleados, res) {
    try {
        const empleadoCreado = await empleado.create(DatosCrearEmpleados);
        res.status(200).json({ mensaje: 'creado correctamente'});
        return empleadoCreado.id; 
        
    } catch (error) {
        // Manejar el error de validación
        if (error.name === 'SequelizeValidationError') {
            const errores = error.errors.map(err => ({
                campo: err.path,
                mensaje: err.message
            }));
            // Aquí puedes usar res porque es pasado como un parámetro
            res.status(400).json({ mensaje: 'Error de validación', errores });
        } else {
            console.log("OCURRIO UN ERROR AL CREAR El empleado: ", error);
            res.status(500).json({ mensaje: 'Ocurrió un error al crear el empleado' });
        }
    }
}

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
    CrearEmpleados,
    ActualizarEmpleado,
    cambiarEstadoEmpleado
    
   
};
