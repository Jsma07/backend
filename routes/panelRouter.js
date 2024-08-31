const express = require('express');
const routes = express.Router();
const { contarClientes, contarVentas, contarCompras, contarServicios, contarEmpleados, obtenerServiciosMasAgendados } = require('../controllers/Panel/usuariosTotalesController');
const {compararSemana, ventasPorMes, contarEstadosAgenda, agendamientosPorMes, insumosMasComprados} = require('../controllers/Panel/TotalesporMesController');

routes.get('/api/totalclientes', contarClientes);
routes.get('/api/totalventas', contarVentas);
routes.get('/api/totalcompras', contarCompras);
routes.get('/api/totalservicios', contarServicios);
routes.get('/api/totalempleados', contarEmpleados);
routes.get('/api/masagendados', obtenerServiciosMasAgendados);
routes.get('/api/contarestadosAgenda', contarEstadosAgenda);
routes.get('/api/agendamientospormes', agendamientosPorMes);
routes.get('/api/comprararsemanaCV', compararSemana);
routes.get('/api/mascompradosInsumos', insumosMasComprados);
routes.get('/api/ventaspormes', ventasPorMes);

module.exports = routes;
