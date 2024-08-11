// const { Sequelize, Op } = require('sequelize');
// const sequelize = require('../../models'); // Ajusta la ruta según tu estructura de directorios
// const Ventas = require('../../Models/ventas'); // Ajusta la ruta según tu estructura

// const ventasTotalesPorMes = async (req, res) => {
//     try {
//         // Consulta para obtener ventas totales por mes
//         const ventasPorMes = await Ventas.findAll({
//             attributes: [
//                 [sequelize.fn('DATE_FORMAT', sequelize.col('fecha'), '%Y-%m'), 'mes'],
//                 [sequelize.fn('SUM', sequelize.col('monto')), 'totalVentas']
//             ],
//             group: ['mes'],
//             order: [[sequelize.col('mes'), 'ASC']]
//         });

//         // Formatear los datos para el gráfico
//         const datos = ventasPorMes.map(v => ({
//             mes: v.get('mes'),
//             totalVentas: v.get('totalVentas')
//         }));

//         res.json(datos);
//     } catch (error) {
//         console.error('Error al obtener ventas por mes:', error);
//         res.status(500).json({ error: 'Error al obtener ventas por mes' });
//     }
// };

// module.exports = {
//     ventasTotalesPorMes
// };
