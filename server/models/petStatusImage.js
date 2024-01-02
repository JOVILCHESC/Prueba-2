// models/petStatusImage.js
module.exports = (sequelize, DataTypes) => {
    const PetStatusImage = sequelize.define('PetStatusImage', {
      filename: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    PetStatusImage.associate = (models) => {
      models.PetStatusImage.belongsTo(models.PetStatus, {
        foreignKey: 'petStatusId',
      });
    };
  
    return PetStatusImage;
  };