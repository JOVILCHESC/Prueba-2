module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // Otros campos según los detalles específicos que necesites.
    
    });
    User.associate = (models) => {
      // Aquí, establece la asociación con Organization
      models.User.hasOne(models.Organization, {
        foreignKey: 'userId', // Usa la misma nomenclatura que en el modelo de Organization
      });
      //asociacion con pet
      models.User.hasMany(models.Pet, { foreignKey: 'userId' });
    };
    return User;
  };