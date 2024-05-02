const Usuario = sequelize.define('usuarios', {
    nombreUsuario: {
      type: Sequelize.STRING,
      allowNull: false
    },
    apellidoUsuario: {
        type: Sequelize.STRING,
        allowNull: false
      },
    coreo: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    telefono: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      rolId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'roles', key: 'idRol' } // Define la relación con el modelo de Rol

      },
    contrasena: {
      type: Sequelize.STRING,
      allowNull: false
    },
    // createdAt: {
    //   type: Sequelize.DATE,
    //   allowNull: false,
    //   defaultValue: Sequelize.NOW
    // }
  });
  