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
const Permisos = sequelize.define(
  "permisos",
  {
    idPermiso: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    tableName: "permisos",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "idPermiso" }],
      },
    ],
  }
);

module.exports = Permisos;
