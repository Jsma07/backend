const { Sequelize, DataTypes } = require('sequelize');

// Conexión a la base de datos
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

// Define el modelo de ventas
const Ventas = sequelize.define('ventas', {
  idVentas: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  idServicio: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'servicios',
      key: 'IdServicio'
    }
  },
  idCliente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'clientes',
      key: 'IdCliente'
    }
  },
  idEmpleado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'empleados',
      key: 'IdEmpleado'
    }
  },
  Iva: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Subtotal: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  Fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  Descuento: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  Total: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  Estado: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'ventas',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "idVentas" },
      ]
    },
    {
      name: "idServico",
      using: "BTREE",
      fields: [
        { name: "idServico" },
      ]
    },
    {
      name: "idCliente",
      using: "BTREE",
      fields: [
        { name: "idCliente" },
      ]
    },
    {
      name: "idEmpleado",
      using: "BTREE",
      fields: [
        { name: "idEmpleado" },
      ]
    },
  ]
});

module.exports = Ventas;
