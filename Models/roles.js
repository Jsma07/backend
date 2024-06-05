const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST, 
  dialect: 'mysql'
});
const Permisos = require('../Models/permisos')
  const Roles =  sequelize.define('roles', {
    idRol: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: Sequelize.STRING(30),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'roles',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idRol" },
        ]
      },
      {
        name: "ix_roles_idRol",
        using: "BTREE",
        fields: [
          { name: "idRol" },
        ]
      },
    ]
  });
    Roles.belongsToMany(Permisos, {
      through: 'permisos_roles',
      foreignKey: 'rolId',
      otherKey: 'permisoId'
    });
  
module.exports = Roles