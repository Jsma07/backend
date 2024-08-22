const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

const Adiciones = sequelize.define(
  "adiciones",
  {
    IdAdiciones: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    Img: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    NombreAdiciones: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    Precio: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    Estado: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "adiciones",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "IdAdiciones" }],
      },
    ],
  }
);

module.exports = Adiciones;
