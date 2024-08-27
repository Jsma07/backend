const { Sequelize, DataTypes } = require("sequelize");


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, // Opcional, solo si necesitas especificar el puerto
  dialect: 'mysql',
});


const DetalleCompra = sequelize.define(
  "detallecompra",
  {
    IdDetalle: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    IdCompra: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "compras", key: "IdCompra" },
    },
    IdInsumo: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "insumos", key: "IdInsumos" },
    },
    precio_unitario: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    cantidad_insumo: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    totalValorInsumos: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "detallecompra",
    timestamps: false,
    indexes: [
      { name: "PRIMARY", unique: true, using: "BTREE", fields: ["IdDetalle"] },
      { name: "IdCompra", using: "BTREE", fields: ["IdCompra"] },
      { name: "IdInsumo", using: "BTREE", fields: ["IdInsumo"] },
    ],
  }
);

const Insumos = require("./insumos");
const Compras = require("./compras");

DetalleCompra.belongsTo(Insumos, {
  foreignKey: "IdInsumo",
  as: "insumo",
  targetKey: "IdInsumos",
});
DetalleCompra.belongsTo(Compras, {
  foreignKey: "IdCompra",
  as: "compra",
  targetKey: "IdCompra",
});

module.exports = DetalleCompra;
