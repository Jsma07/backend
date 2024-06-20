const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST, 
  dialect: 'mysql'
});

const DetalleVentas = sequelize.define('detalleventas', {
  idDetalle: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  Idventa: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'ventas',
      key: 'idVentas'
    }
  },
  Idinsumo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'insumos',
      key: 'IdInsumos'
    }
  },
  Usos: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Precio_unitario: {
    type: DataTypes.DOUBLE,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'detalleventas',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "idDetalle" },
      ]
    },
    {
      name: "Idventa",
      using: "BTREE",
      fields: [
        { name: "Idventa" },
      ]
    },
    {
      name: "Idinsumo",
      using: "BTREE",
      fields: [
        { name: "Idinsumo" },
      ]
    },
  ]
});

// Relaciones
const Ventas = require('./ventas');
const Insumos = require('./insumos');

DetalleVentas.belongsTo(Ventas, { foreignKey: 'Idventa', as: 'venta' });
DetalleVentas.belongsTo(Insumos, { foreignKey: 'Idinsumo', as: 'insumo' });

module.exports = DetalleVentas;
