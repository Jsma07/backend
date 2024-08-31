const { Sequelize, DataTypes } = require('sequelize');

const Ventas = require('./ventas');
const Adiciones = require('./adiciones');

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
  IdAdiciones: {
    type: DataTypes.INTEGER,
    allowNull: true,  // Cambiar a false si es obligatorio
    references: {
      model: 'adiciones',
      key: 'IdAdiciones'
    }
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
      name: "IdAdiciones",
      using: "BTREE",
      fields: [
        { name: "IdAdiciones" },
      ]
    },
  ]
});

DetalleVentas.belongsTo(Ventas, { foreignKey: 'Idventa', as: 'venta' });
DetalleVentas.belongsTo(Adiciones, { foreignKey: 'IdAdiciones', as: 'adicion' });

module.exports = DetalleVentas;
