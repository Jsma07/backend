const Sequelize = require("sequelize");
const Categorias = require("./categorias");
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

const Insumo = sequelize.define(
  "insumos",
  {
    IdInsumos: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    Idproveedor: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "El ID del proveedor no puede estar vacío.",
        },
        isInt: {
          msg: "El ID del proveedor debe ser un número entero.",
        },
      },
    },
    NombreInsumos: {
      type: Sequelize.STRING(60),
      allowNull: false,
    },
    Cantidad: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    PrecioUnitario: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    Estado: {
      type: Sequelize.STRING(20),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "El estado no puede estar vacío.",
        },
        isIn: {
          args: [["Disponible", "Agotado"]],
          msg: 'El estado debe ser "Disponible" o "Agotado".',
        },
      },
    },
    IdCategoria: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "El ID de categoría no puede estar vacío.",
        },
        isInt: {
          msg: "El ID de categoría debe ser un número entero.",
        },
      },
    },
    Imagen: {
      type: Sequelize.STRING(2000),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "La imagen no puede estar vacía.",
        },
      },
    },
    isDeleted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "insumos",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "IdInsumos" }],
      },
      {
        name: "IdCategoria",
        using: "BTREE",
        fields: [{ name: "IdCategoria" }],
      },
      {
        name: "Idproveedor",
        using: "BTREE",
        fields: [{ name: "Idproveedor" }],
      },
    ],
  }
);

Insumo.belongsTo(Categorias, {
  foreignKey: "IdCategoria",
  as: "categoria",
});

module.exports = Insumo;
