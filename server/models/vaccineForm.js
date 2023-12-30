module.exports = (sequelize, DataTypes) => {
    const VaccineForm = sequelize.define("VaccineForm", {
      vaccineName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      observation: {
        type: DataTypes.TEXT,
      },
      vaccineDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      vaccinationLocation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vaccinationLocationAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vaccinatorName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    VaccineForm.associate = (models) => {
      models.VaccineForm.belongsTo(models.User, {
        foreignKey: 'userId',
      });
  
      models.VaccineForm.belongsTo(models.Pet, {
        foreignKey: 'petId',
      });
  
      // Agrega la relación con Sede si es necesario
      models.VaccineForm.belongsTo(models.Sede, {
        foreignKey: 'sedeId',
      });
    };
  
    return VaccineForm;
  };
  