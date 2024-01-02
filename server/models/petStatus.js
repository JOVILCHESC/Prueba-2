// models/petStatus.js
module.exports = (sequelize, DataTypes) => {
    const PetStatus = sequelize.define('PetStatus', {
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    });
  
    PetStatus.associate = (models) => {
      models.PetStatus.belongsTo(models.Pet, {
        foreignKey: 'petId',
      });
      models.PetStatus.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      models.PetStatus.hasMany(models.PetStatusImage, {
        foreignKey: 'petStatusId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    };
  
    return PetStatus;
  };