module.exports = (sequelize, DataTypes) => {
    const Organization = sequelize.define("Organization", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      legal_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      trade_name: {
        type: DataTypes.STRING,
      },
      legal_registration_number: {
        type: DataTypes.STRING,
      },
      organizationEmail: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      legal_form: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      legal_representative_name: {
        type: DataTypes.STRING,
      },
      legal_representative_title: {
        type: DataTypes.STRING,
      },
      // Otros campos según los detalles específicos que necesites.
    });
  
    Organization.associate = (models) => {
      models.Organization.belongsTo(models.User, {
        foreignKey: 'userId',
      });

      // Asociación con Sede
    models.Organization.hasMany(models.Sede, {
      foreignKey: 'organizationId', // Nombre de la clave foránea en la tabla de sedes
    });

    };
  
    return Organization;
  };
  