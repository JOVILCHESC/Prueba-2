// models/contribution.js
module.exports = (sequelize, DataTypes) => {
    const Contribution = sequelize.define('Contribution', {
      filename: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    Contribution.associate = (models) => {
      models.Contribution.belongsTo(models.Fundraising, {
        foreignKey: 'fundraisingId',
      });

      // Relación con el modelo User (Usuario que hizo la contribución)
    models.Contribution.belongsTo(models.User, {
      foreignKey: 'userId',
      allowNull: true,
    });
    
    };
  
    return Contribution;
  };
  