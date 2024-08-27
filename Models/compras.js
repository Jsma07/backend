const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, // Opcional, solo si necesitas especificar el puerto
  dialect: 'mysql',
});

const Compras = sequelize.define(
  "compras",
  {
    IdCompra: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    fecha_compra: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    descuento_compra: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    iva_compra: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    subtotal_compra: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    total_compra: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    estado_compra: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "compras",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "IdCompra" }],
      },
    ],
  }
);

module.exports = Compras;
