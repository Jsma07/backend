const Sequelize = require("sequelize");

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
const Categoria = sequelize.define(
  "categorias",
  {
    IdCategoria: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    nombre_categoria: {
      type: Sequelize.STRING(20),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "El nombre de la categoria no puede estar vacío.",
        },
        is: {
          args: /^[a-zA-ZñÑ\s]*$/,
          msg: "El nombre de la categoria solo puede contener letras y espacios.",
        },
        len: {
          args: [1, 30],
          msg: "El nombre de la categoria debe tener entre 1 y 30 caracteres",
        },
      },
    },
    estado_categoria: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        isIn: {
          args: [[0, 1]],
          msg: "El estado de la categoria debe ser 0 (inactivo) o 1 (activo)",
        },
        notEmpty: {
          msg: "El estado de la categoria no puede estar vacío.",
        },
      },
    },
  },
  {
    sequelize,
    tableName: "categorias",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "IdCategoria" }],
      },
    ],
  }
);

module.exports = Categoria;
