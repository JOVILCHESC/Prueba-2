// sede.js
module.exports = (sequelize, DataTypes) => {
    const Sede = sequelize.define("Sede", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      street: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      state: {
        type: DataTypes.STRING,
      },
      postalCode: {
        type: DataTypes.STRING,
      },
      phoneNumber: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
      },
      openingTime: {
        type: DataTypes.TIME,
      },
      closingTime: {
        type: DataTypes.TIME,
      },
      latitude: {
        type: DataTypes.FLOAT,
      },
      longitude: {
        type: DataTypes.FLOAT,
      },
    });
  
    Sede.associate = (models) => {
      // Asociación con User
      models.Sede.belongsTo(models.User, {
        foreignKey: 'userId', // Nombre de la clave foránea en la tabla Sede
      });
      // Asociación con Organization
      models.Sede.belongsTo(models.Organization, {
        foreignKey: 'organizationId',
      });
    };
  
    return Sede;
  };
  