const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // Opcional, solo si necesitas especificar el puerto
    dialect: "mysql",
  }
);

const Cliente = require("./clientes");
const Empleado = require("./empleados");
const Servicio = require("./servicios");

const Ventas = sequelize.define(
  "ventas",
  {
    idVentas: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    idServicio: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    IdCliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idEmpleado: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    Subtotal: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    Fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Descuento: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    Total: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    Estado: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "ventas",
    timestamps: false,
  }
);

Ventas.belongsTo(Cliente, { foreignKey: "IdCliente" });
Ventas.belongsTo(Empleado, { foreignKey: "idEmpleado" });
Ventas.belongsTo(Servicio, { foreignKey: "idServicio" });

module.exports = Ventas;
