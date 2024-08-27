const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, // Opcional, solo si necesitas especificar el puerto
  dialect: 'mysql',
});

const Proveedor = sequelize.define(
  "proveedores",
  {
    IdProveedor: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    NIT: {
      type: Sequelize.STRING(10),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "El NIT del proveedor no puede estar vacío.",
        },
        isNumeric: {
          msg: "El NIT del proveedor debe contener solo números.",
        },
        len: {
          args: [9, 10],
          msg: "El NIT del proveedor debe tener por lo menos 9 o 10 numeros",
        },
      },
    },
    nombre_proveedor: {
      type: Sequelize.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "El nombre del proveedor no puede estar vacío.",
        },
        is: {
          args: /^[a-zA-Z\s]*$/,
          msg: "El nombre del proveedor solo puede contener letras y espacios.",
        },
        len: {
          args: [1, 30],
          msg: "El nombre del proveedor debe tener entre 1 y 30 caracteres",
        },
      },
    },
    correo_proveedor: {
      type: Sequelize.STRING(30),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "El correo del proveedor no puede estar vacío.",
        },
        isEmail: {
          msg: "Debe proporcionar un correo electrónico válido.",
        },
      },
    },
    telefono_proveedor: {
      type: Sequelize.STRING(20),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "El teléfono del proveedor no puede estar vacío.",
        },
        isNumeric: {
          msg: "El teléfono del proveedor debe contener solo números.",
        },
        len: {
          args: [10, 15],
          msg: "El telefono del proveedor debe tener entre 10 y 15 numeros",
        },
      },
    },
    direccion_proveedor: {
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "La dirección del proveedor no puede estar vacía.",
        },
      },
    },
    empresa_proveedor: {
      type: Sequelize.STRING(30),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "La empresa del proveedor no puede estar vacía.",
        },
        len: {
          args: [1, 30],
          msg: "La empresa del proveedor debe tener entre 1 y 30 caracteres",
        },
      },
    },
    estado_proveedor: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        isIn: {
          args: [[0, 1]],
          msg: "El estado del proveedor debe ser 0 (inactivo) o 1 (activo)",
        },
        notEmpty: {
          msg: "El estado del proveedor no puede estar vacío.",
        },
      },
    },
  },
  {
    sequelize,
    tableName: "proveedores",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "IdProveedor" }],
      },
    ],
  }
);

module.exports = Proveedor;
