const { Op } = require('sequelize');
const  Clientes  = require('../../Models/clientes'); 
const Ventas = require('../../Models/ventas');
const Compras = require('../../Models/compras');
const Servicios = require('../../Models/servicios');

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
                Estado: 3
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



module.exports = { contarClientes, contarVentas, contarCompras, contarServicios };
