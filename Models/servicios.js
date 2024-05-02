const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('servicios', {
    IdServicio: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nombre_Servicio: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Precio_Servicio: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    Tiempo_Servicio: {
      type: DataTypes.TIME,
      allowNull: false
    },
    ImgServicio: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    EstadoServicio: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'servicios',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "IdServicio" },
        ]
      },
    ]
  });
};
