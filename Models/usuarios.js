const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST, 
  dialect: 'mysql'
});

const Usuario = sequelize.define('usuarios', {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  nombre: {
    type: Sequelize.STRING(50),
    allowNull: true
  },
  apellido: {
    type: Sequelize.STRING(50),
    allowNull: true
  },
  correo: {
    type: Sequelize.STRING(120),
    allowNull: true
  },
  telefono: {
    type: Sequelize.STRING(20),
    allowNull: true
  },
  contrasena: {
    type: Sequelize.STRING(100),
    allowNull: true
  },
  rolId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'roles',
      key: 'idRol'
    }
  },
  estado: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
}, {
  sequelize,
  tableName: 'usuarios',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "idUsuario" }
      ]
    },
    {
      name: "rolId",
      using: "BTREE",
      fields: [
        { name: "rolId" }
      ]
    },
    {
      name: "ix_usuarios_id",
      using: "BTREE",
      fields: [
        { name: "idUsuario" }
      ]
    }
  ]
});

module.exports = Usuario;