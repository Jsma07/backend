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

const Roles = require("./roles"); // Asegúrate de que la ruta sea correcta

const Empleado = sequelize.define(
  "empleados",
  {
    IdEmpleado: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    Nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo nombre es obligatorio",
        },
        is: /^[a-zA-Z\s]*$/,
      },
    },
    Tip_Documento: {
      type: Sequelize.STRING(50),
      allowNull: false,
      validate: {
        len: [3, 30],
        notEmpty: true,
      },
    },

    Apellido: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo Apellido es obligatorio",
        },
      },
    },
    Correo: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo Correo es obligatorio",
        },
        isEmail: {
          msg: "El campo Correo debe ser una dirección de correo electrónico válida",
        },
      },
    },
    Telefono: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo Teléfono es obligatorio",
        },
        isNumeric: {
          msg: "El campo Teléfono debe contener solo números",
        },
      },
    },
    Estado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo Estado es obligatorio",
        },
        isInt: {
          msg: "El campo Estado debe ser un número entero",
        },
      },
    },
    IdRol: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo IdRol es obligatorio",
        },
        isInt: {
          msg: "El campo IdRol debe ser un número entero",
        },
      },
    },
    Documento: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo Documento es obligatorio",
        },
        len: {
          args: [10, 15],
          msg: "El campo Documento debe tener entre 10 y 15 caracteres",
        },
      },
    },
    Direccion: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo Dirección es obligatorio",
        },
      },
    },
    Contrasena: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: {
          msg: "El campo Contrasena es obligatorio",
        },
      },
    },
  },
  {
    tableName: "empleados",
    timestamps: false,
  }
);

Empleado.belongsTo(Roles, { foreignKey: "IdRol" });
// Definir la asociación

module.exports = Empleado;
