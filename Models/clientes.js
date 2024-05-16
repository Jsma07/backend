const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST, 
  dialect: 'mysql'
});

const Cliente = sequelize.define('clientes', {
  IdCliente: {
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
      },
      is: /^[a-zA-Z\s]*$/, 
    }
  },
  Correo: {
    type: Sequelize.STRING(60),
    allowNull: false,
    validate: {
      isEmail: true 
    }
  },
  Telefono: {
    type: Sequelize.STRING(20),
    allowNull: false,
    validate: {
      is: /^[0-9]*$/, 
    }
  },
  Estado: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
        isInt: {
            msg: 'El campo Estado debe ser un número entero'
        }
    }
},
  FotoPerfil: {
    type: Sequelize.STRING(250),
    allowNull: false
  },
  IdRol: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'roles',
      key: 'idRol'
    }
  }
}, {
  sequelize,
  tableName: 'clientes',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "IdCliente" },
      ]
    },
    {
      name: "IdRol",
      using: "BTREE",
      fields: [
        { name: "IdRol" },
      ]
    },
  ]
});

module.exports = Cliente;
