const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

const Insumo = require("./insumos"); // Ajusta el path al archivo correcto

const Salida = sequelize.define(
  "salidas",
  {
    IdSalida: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    Idinsumos: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Insumo, // Nombre del modelo al que se relaciona
        key: "IdInsumos", // Llave primaria de Insumo
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      validate: {
        notEmpty: {
          msg: "El ID del insumo no puede estar vacío.",
        },
        isInt: {
          msg: "El ID del insumo debe ser un número entero.",
        },
      },
    },
    Descripcion: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    Cantidad: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "La cantidad no puede estar vacía.",
        },
        isInt: {
          msg: "La cantidad debe ser un número entero.",
        },
        min: {
          args: [1],
          msg: "La cantidad debe ser al menos 1.",
        },
      },
    },
    Fecha_salida: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "La fecha de salida no puede estar vacía.",
        },
        isDate: {
          msg: "La fecha de salida debe ser una fecha válida.",
        },
      },
    },
    Estado: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "El estado no puede estar vacío.",
        },
        isIn: {
          args: [["Anulado", "Terminado"]],
          msg: 'El estado debe ser "Pendiente" o "Completado".',
        },
      },
    },
  },
  {
    tableName: "salidas",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "IdSalida" }],
      },
      {
        name: "Idinsumos",
        using: "BTREE",
        fields: [{ name: "Idinsumos" }],
      },
    ],
  }
);

// Establecemos la relación entre los modelos
Insumo.hasMany(Salida, {
  foreignKey: "Idinsumos",
  sourceKey: "IdInsumos",
  as: "salidas",
});

Salida.belongsTo(Insumo, {
  foreignKey: "Idinsumos",
  targetKey: "IdInsumos",
  as: "insumo",
});

module.exports = Salida;
