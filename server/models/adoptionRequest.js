// adoptionRequest.js
module.exports = (sequelize, DataTypes) => {
    const AdoptionRequest = sequelize.define("AdoptionRequest", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        defaultValue: 'pending',
      },
      // Otros campos según tus necesidades
    });
  
    AdoptionRequest.associate = (models) => {
      // Asociación con User
      models.AdoptionRequest.belongsTo(models.User, {
        foreignKey: 'userId',
      });
  
      // Asociación con Pet(mascota subida o request replacement si se entiende mejor)
      models.AdoptionRequest.belongsTo(models.Pet, {
        foreignKey: 'petId',
      });
      //asociacion con verificationForm
      models.AdoptionRequest.belongsTo(models.VerificationForm, {
        foreignKey: 'verificationFormId',
      });
      //asociacion con organization
      models.AdoptionRequest.belongsTo(models.Organization, {
        foreignKey: 'organizationId',
      });

    };
  
    return AdoptionRequest;
  };
  