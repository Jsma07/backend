const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, // Opcional, solo si necesitas especificar el puerto
  dialect: 'mysql',
});

const Horario = sequelize.define(
  "Horario",
  {
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      unique: true,
    },
    estado: {
      type: DataTypes.ENUM("activo", "inactivo"),
      defaultValue: "activo",
    },
    horas_inactivas: {
      type: DataTypes.STRING, // Cambiado a VARCHAR
      allowNull: true,
      defaultValue: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Horario;
