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

const PermisosXRol = require("./permisos_roles"); // Asegúrate de que la ruta sea correcta
const Permisos = require("./permisos"); // Asegúrate de que la ruta sea correcta

const Roles = sequelize.define(
  "roles",
  {
    idRol: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(30),
      validate: {
        len: [3, 30],
        notEmpty: true,
      },
    },
    EstadoRol: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "roles",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "idRol" }],
      },
      {
        name: "ix_roles_idRol",
        using: "BTREE",
        fields: [{ name: "idRol" }],
      },
    ],
  }
);

// Definir asociaciones
Roles.belongsToMany(Permisos, {
  through: PermisosXRol,
  foreignKey: "rolId",
  otherKey: "permisoId",
});

module.exports = Roles;
