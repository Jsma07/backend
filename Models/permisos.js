const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST, 
  dialect: 'mysql'
});
const Roles = require('../Models/roles')
  const Permisos = sequelize.define('permisos', {
    idPermiso: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: Sequelize.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'permisos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idPermiso" },
        ]
      },
    ]
  });
    Permisos.belongsToMany(Roles, {
      through: 'permisos_roles',
      foreignKey: 'permisoId',
      otherKey: 'rolId'
    });
  
module.exports = Permisos