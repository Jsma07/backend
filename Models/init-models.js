var DataTypes = require("sequelize").DataTypes;
var _categorias = require("./categorias");
var _clientes = require("./clientes");
var _compras = require("./compras");
var _detallecompra = require("./detallecompra");
var _detalleventas = require("./detalleventas");
var _empleados = require("./empleados");
var _insumos = require("./insumos");
var _permisos = require("./permisos");
var _permisos_roles = require("./permisos_roles");
var _proveedores = require("./proveedores");
var _roles = require("./roles");
var _servicios = require("./servicios");
var _usuarios = require("./usuarios");
var _ventas = require("./ventas");

function initModels(sequelize) {
  var categorias = _categorias(sequelize, DataTypes);
  var clientes = _clientes(sequelize, DataTypes);
  var compras = _compras(sequelize, DataTypes);
  var detallecompra = _detallecompra(sequelize, DataTypes);
  var detalleventas = _detalleventas(sequelize, DataTypes);
  var empleados = _empleados(sequelize, DataTypes);
  var insumos = _insumos(sequelize, DataTypes);
  var permisos = _permisos(sequelize, DataTypes);
  var permisos_roles = _permisos_roles(sequelize, DataTypes);
  var proveedores = _proveedores(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var servicios = _servicios(sequelize, DataTypes);
  var usuarios = _usuarios(sequelize, DataTypes);
  var ventas = _ventas(sequelize, DataTypes);

  ventas.belongsTo(clientes, { as: "idCliente_cliente", foreignKey: "idCliente"});
  clientes.hasMany(ventas, { as: "venta", foreignKey: "idCliente"});
  detallecompra.belongsTo(compras, { as: "IdCompra_compra", foreignKey: "IdCompra"});
  compras.hasMany(detallecompra, { as: "detallecompras", foreignKey: "IdCompra"});
  ventas.belongsTo(empleados, { as: "idEmpleado_empleado", foreignKey: "idEmpleado"});
  empleados.hasMany(ventas, { as: "venta", foreignKey: "idEmpleado"});
  detallecompra.belongsTo(insumos, { as: "IdInsumo_insumo", foreignKey: "IdInsumo"});
  insumos.hasMany(detallecompra, { as: "detallecompras", foreignKey: "IdInsumo"});
  detalleventas.belongsTo(insumos, { as: "Idinsumo_insumo", foreignKey: "Idinsumo"});
  insumos.hasMany(detalleventas, { as: "detalleventa", foreignKey: "Idinsumo"});
  permisos_roles.belongsTo(permisos, { as: "permiso", foreignKey: "permisoId"});
  permisos.hasMany(permisos_roles, { as: "permisos_roles", foreignKey: "permisoId"});
  detallecompra.belongsTo(proveedores, { as: "IdProveedor_proveedore", foreignKey: "IdProveedor"});
  proveedores.hasMany(detallecompra, { as: "detallecompras", foreignKey: "IdProveedor"});
  clientes.belongsTo(roles, { as: "IdRol_role", foreignKey: "IdRol"});
  roles.hasMany(clientes, { as: "clientes", foreignKey: "IdRol"});
  empleados.belongsTo(roles, { as: "IdRol_role", foreignKey: "IdRol"});
  roles.hasMany(empleados, { as: "empleados", foreignKey: "IdRol"});
  permisos_roles.belongsTo(roles, { as: "rol", foreignKey: "rolId"});
  roles.hasMany(permisos_roles, { as: "permisos_roles", foreignKey: "rolId"});
  usuarios.belongsTo(roles, { as: "rol", foreignKey: "rolId"});
  roles.hasMany(usuarios, { as: "usuarios", foreignKey: "rolId"});
  ventas.belongsTo(servicios, { as: "idServico_servicio", foreignKey: "idServico"});
  servicios.hasMany(ventas, { as: "venta", foreignKey: "idServico"});
  detalleventas.belongsTo(ventas, { as: "Idventa_venta", foreignKey: "Idventa"});
  ventas.hasMany(detalleventas, { as: "detalleventa", foreignKey: "Idventa"});

  return {
    categorias,
    clientes,
    compras,
    detallecompra,
    detalleventas,
    empleados,
    insumos,
    permisos,
    permisos_roles,
    proveedores,
    roles,
    servicios,
    usuarios,
    ventas,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
