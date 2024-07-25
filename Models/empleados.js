const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

const Empleado = sequelize.define('empleados', {
  IdEmpleado: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  Nombre: {
    type: Sequelize.STRING(50),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'El campo nombre es obligatorio'
      },

      is: /^[a-zA-Z\s]*$/, 
    }
  },
  Apellido: {
    type: Sequelize.STRING(50),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'El campo Apellido es obligatorio'
      }
    }
  },
  Correo: {
    type: Sequelize.STRING(60),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'El campo Correo es obligatorio'
      },
      isEmail: {
        msg: 'El campo Correo debe ser una dirección de correo electrónico válida'
      }
    }
  },
  Telefono: {
    type: Sequelize.STRING(15), // Cambiado de INTEGER a STRING
    allowNull: false,
    validate: {
      notNull: {
        msg: 'El campo Teléfono es obligatorio'
      },
      isNumeric: {
        msg: 'El campo Teléfono debe contener solo números'
      }
    }
  },
  Estado: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'El campo Estado es obligatorio'
      },
      isInt: {
        msg: 'El campo Estado debe ser un número entero'
      }
    }
  },
  IdRol: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'El campo IdRol es obligatorio'
      },
      isInt: {
        msg: 'El campo IdRol debe ser un número entero'
      }
    }
  },
  Documento: {
    type: Sequelize.STRING(20),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'El campo Documento es obligatorio'
      },
      len: {
        args: [10, 15],
        msg: 'El campo Documento debe tener entre 8 y 20 caracteres'
      }
    }
  },
  Direccion: {
    type: Sequelize.STRING(100),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'El campo Dirección es obligatorio'
      }
    }
  },
  Contrasena: {
    type: Sequelize.STRING(100),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'El campo Contrasena es obligatorio'
      },
      len: {
        args: [10, 30],
        msg: 'El campo Contrasena debe tener entre 8 y 100 caracteres'
      }
    }
  }
}, {
  tableName: 'empleados',
  timestamps: false
});

module.exports = Empleado;