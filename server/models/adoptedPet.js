// models/MascotasAdoptadas.js
module.exports = (sequelize, DataTypes) => {
    const adoptedPet = sequelize.define("adoptedPet", {}, {
      tableName: 'adopted_pet',
      timestamps: false,
    });
  
    adoptedPet.associate = (models) => {
      // Asociación con User
      models.adoptedPet.belongsTo(models.User, {
        foreignKey: 'userId',
      });
  
      // Asociación con Pet
      models.adoptedPet.belongsTo(models.Pet, {
        foreignKey: 'petId',
      });

      models.adoptedPet.belongsTo(models.Sede, {
        foreignKey: 'sedeId',
      });
    };
  
    return adoptedPet;
  };
  