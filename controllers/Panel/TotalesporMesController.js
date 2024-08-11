const { Op, fn, col } = require('sequelize');
const Compras = require('../../Models/compras'); 
const Ventas = require('../../Models/ventas'); 

const compararSemana = async (req, res) => {
    try {
        const inicioSemana = new Date();
        inicioSemana.setDate(inicioSemana.getDate() - inicioSemana.getDay());
        inicioSemana.setHours(0, 0, 0, 0);

        const finSemana = new Date(inicioSemana);
        finSemana.setDate(finSemana.getDate() + 6);
        finSemana.setHours(23, 59, 59, 999);

        const sumaCompras = await Compras.sum('total_compra', {
            where: {
                fecha_compra: {
                    [Op.between]: [inicioSemana, finSemana]
                }
            }
        });

        const sumaVentas = await Ventas.sum('Total', {
            where: {
                Fecha: {
                    [Op.between]: [inicioSemana, finSemana]
                }
            }
        });

        res.json({
            sumaCompras,
            sumaVentas,
            comparacion: sumaVentas - sumaCompras
        });
    } catch (error) {
        console.error("Error al comparar compras y ventas:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

const compararMes = async (req, res) => {
    try {
        const fechaActual = new Date();
        const mesActual = fechaActual.getMonth() + 1; // Mes actual (1-12)
        const anioActual = fechaActual.getFullYear();

        // Fechas para el mes actual
        const inicioMesActual = new Date(anioActual, mesActual - 1, 1);
        const finMesActual = new Date(anioActual, mesActual, 0);

        // Fechas para el mes anterior
        const inicioMesAnterior = new Date(anioActual, mesActual - 2, 1);
        const finMesAnterior = new Date(anioActual, mesActual - 1, 0);

        // Suma de compras y ventas para el mes actual
        const sumaComprasActual = await Compras.sum('total_compra', {
            where: {
                fecha_compra: {
                    [Op.between]: [inicioMesActual, finMesActual]
                }
            }
        });

        const sumaVentasActual = await Ventas.sum('Total', {
            where: {
                Fecha: {
                    [Op.between]: [inicioMesActual, finMesActual]
                }
            }
        });

        const sumaComprasAnterior = await Compras.sum('total_compra', {
            where: {
                fecha_compra: {
                    [Op.between]: [inicioMesAnterior, finMesAnterior]
                }
            }
        });

        const sumaVentasAnterior = await Ventas.sum('Total', {
            where: {
                Fecha: {
                    [Op.between]: [inicioMesAnterior, finMesAnterior]
                }
            }
        });

        res.json({
            sumaCompras: {
                actual: sumaComprasActual,
                anterior: sumaComprasAnterior
            },
            sumaVentas: {
                actual: sumaVentasActual,
                anterior: sumaVentasAnterior
            },
            comparacion: {
                compras: sumaComprasActual - sumaComprasAnterior,
                ventas: sumaVentasActual - sumaVentasAnterior
            }
        });
    } catch (error) {
        console.error("Error al comparar compras y ventas:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

const ventasPorMes = async (req, res) => {
    try {
        const inicioMesActual = new Date();
        inicioMesActual.setDate(1);
        inicioMesActual.setHours(0, 0, 0, 0);

        const ventas = await Ventas.findAll({
            attributes: [
                [fn('YEAR', col('Fecha')), 'año'],
                [fn('MONTH', col('Fecha')), 'mes'],
                [fn('SUM', col('Total')), 'totalVentas']
            ],
            where: {
                Fecha: {
                    [Op.lte]: new Date() 
                }
            },
            group: ['año', 'mes'],
            order: [['año', 'DESC'], ['mes', 'DESC']]
        });

        res.json(ventas);
    } catch (error) {
        console.error("Error al obtener ventas por mes:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};


module.exports = {compararSemana, compararMes, ventasPorMes};
