const { Op, fn, col, literal } = require('sequelize');
const Clientes = require('../../Models/clientes'); 
const Ventas = require('../../Models/ventas');
const Compras = require('../../models/compras');
const Servicios = require('../../Models/servicios');
const Agenda = require('../../Models/agendamiento');
const Empleados = require('../../Models/empleados');

const contarClientes = async (req, res) => {
    try {
        const totalClientes = await Clientes.count(); 
        console.log("Total clientes:", totalClientes);

        res.json({ totalClientes });
    } catch (error) {
        console.error('Error al contar los clientes:', error);
        res.status(500).json({ error: 'Error al contar los clientes' });
    }
};

const contarVentas = async (req, res) => {
    try {
        const totalVentas = await Ventas.count({
            where: {
                Estado: 1
            }
        });
        console.log("Total ventas con Estado 3:", totalVentas);

        res.json({ totalVentas });
    } catch (error) {
        console.error('Error al contar las ventas:', error);
        res.status(500).json({ error: 'Error al contar las ventas' });
    }
};

const contarCompras = async (req, res) => {
    try {
        const totalCompras = await Compras.count({
            where: {
                estado_compra: {
                    [Op.in]: ['En espera', 'Terminada'] 
                }
            }
        });
        console.log("Total compras con estado 'En espera' o 'Terminada':", totalCompras);

        res.json({ totalCompras });
    } catch (error) {
        console.error('Error al contar las compras:', error);
        res.status(500).json({ error: 'Error al contar las compras' });
    }
};

const contarServicios = async (req, res) => {
    try {
        const totalServicios = await Servicios.count({
            where: {
                EstadoServicio: 1
            }
        });
        console.log("Total servicios con estado 'En espera' o 'Terminada':", totalServicios);

        res.json({ totalServicios });
    } catch (error) {
        console.error('Error al contar las servicios:', error);
        res.status(500).json({ error: 'Error al contar las servicios' });
    }
};

const contarEmpleados = async (req, res) => {
    try {
        const totalEmpleados = await Empleados.count({
            where: {
                Estado: 1
            }
        });
        console.log("Total empleados con estado 'En espera' o 'Terminada':", totalEmpleados);

        res.json({ totalEmpleados });
    } catch (error) {
        console.error('Error al contar las empleados:', error);
        res.status(500).json({ error: 'Error al contar las empleados' });
    }
};

const obtenerServiciosMasAgendados = async (req, res) => {
    try {
        console.log("Iniciando consulta de agendamientos...");

        //Obtener todos los agendamientos
        const agendamientos = await Agenda.findAll({
            attributes: ['IdServicio'],
            raw: true
        });

        console.log("Agendamientos obtenidos:", agendamientos);

        //Contabilizar los agendamientos por servicio
        const conteos = {};
        for (const agendamiento of agendamientos) {
            const servicioId = agendamiento.IdServicio;
            if (conteos[servicioId]) {
                conteos[servicioId]++;
            } else {
                conteos[servicioId] = 1;
            }
        }

        console.log("Conteos de agendamientos:", conteos);

        //Obtener los servicios con su precio
        const serviciosMasAgendados = await Servicios.findAll({
            where: {
                IdServicio: Object.keys(conteos)
            },
            attributes: ['IdServicio', 'Nombre_Servicio', 'Precio_servicio', 'ImgServicio'],
            raw: true
        });

        console.log("Servicios obtenidos:", serviciosMasAgendados);

        //Combinar los servicios con los conteos de agendamientos
        const serviciosConConteos = serviciosMasAgendados.map(servicio => ({
            IdServicio: servicio.IdServicio,
            ImgServicio : servicio.ImgServicio,
            Nombre_Servicio: servicio.Nombre_Servicio,
            Precio_servicio: servicio.Precio_servicio,
            cantidadAgendamientos: conteos[servicio.IdServicio] || 0
        }));

        //Ordenar los servicios por cantidad de agendamientos
        serviciosConConteos.sort((a, b) => b.cantidadAgendamientos - a.cantidadAgendamientos);

        console.log("Servicios ordenados:", serviciosConConteos);

        //Seleccionar los 4 servicios más agendados
        const topServicios = serviciosConConteos.slice(0, 4);

        console.log("Servicios más agendados:", topServicios);

        //Enviar la respuesta al cliente
        res.json(topServicios);
    } catch (error) {
        console.error('Error al obtener los servicios más agendados:', error);
        res.status(500).json({ error: 'Error al obtener los servicios más agendados' });
    }
};

const obtenerServicioMasVendido = async (req, res) => {
    try {
        console.log("Iniciando consulta de ventas...");

        // Obtener todos los registros de ventas con estado igual a 1
        const ventas = await Ventas.findAll({
            attributes: ['IdServicio'],
            where: {
                estado: 1  // Filtrar por estado igual a 1
            },
            raw: true
        });

        console.log("Ventas obtenidas:", ventas);

        if (ventas.length === 0) {
            console.log("No hay ventas con el estado indicado.");
            return res.json(null);  // No hay ventas para procesar
        }

        // Contabilizar las ventas por servicio
        const conteos = {};
        for (const venta of ventas) {
            const servicioId = venta.IdServicio;
            if (conteos[servicioId]) {
                conteos[servicioId]++;
            } else {
                conteos[servicioId] = 1;
            }
        }

        console.log("Conteos de ventas:", conteos);

        // Obtener los servicios con su precio
        const servicios = await Servicios.findAll({
            where: {
                IdServicio: Object.keys(conteos)
            },
            attributes: ['IdServicio', 'Nombre_Servicio', 'Precio_servicio', 'ImgServicio'],
            raw: true
        });

        console.log("Servicios obtenidos:", servicios);

        if (servicios.length === 0) {
            console.log("No se encontraron servicios correspondientes a las ventas.");
            return res.json(null);  // No hay servicios para procesar
        }

        // Combinar los servicios con los conteos de ventas
        const serviciosConConteos = servicios.map(servicio => ({
            IdServicio: servicio.IdServicio,
            ImgServicio: servicio.ImgServicio,
            Nombre_Servicio: servicio.Nombre_Servicio,
            Precio_servicio: servicio.Precio_servicio,
            cantidadVentas: conteos[servicio.IdServicio] || 0
        }));

        console.log("Servicios con conteos:", serviciosConConteos);

        // Ordenar los servicios por cantidad de ventas
        serviciosConConteos.sort((a, b) => b.cantidadVentas - a.cantidadVentas);

        console.log("Servicios ordenados:", serviciosConConteos);

        // Seleccionar el servicio más vendido
        const servicioMasVendido = serviciosConConteos.length > 0 ? serviciosConConteos[0] : null;

        console.log("Servicio más vendido:", servicioMasVendido);

        // Enviar la respuesta al cliente
        res.json(servicioMasVendido);
    } catch (error) {
        console.error('Error al obtener el servicio más vendido:', error);
        res.status(500).json({ error: 'Error al obtener el servicio más vendido' });
    }
};


module.exports = { contarClientes, contarVentas, contarCompras, contarServicios, contarEmpleados, obtenerServiciosMasAgendados, obtenerServicioMasVendido};
