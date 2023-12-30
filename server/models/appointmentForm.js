module.exports = (sequelize, DataTypes) => {
    const AppointmentForm = sequelize.define("AppointmentForm",{

    date: {
        type: DataTypes.DATEONLY, // Solo la fecha sin la hora
        allowNull: false,
    },
    hour: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    place: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    motive: {
        type: DataTypes.TEXT,
    },
    });

    AppointmentForm.associate = (models) => {
    models.AppointmentForm.belongsTo(models.User, {
        foreignKey: 'userId', // Nombre de la clave foránea en la tabla de mascotas
      });

    models.AppointmentForm.belongsTo(models.Pet, {
        foreignKey: 'petId',
      });

    models.AppointmentForm.belongsTo(models.Sede, { 
        foreignKey: 'sedeId' 
      });

    }
    
    return AppointmentForm;
    //relaciones
};
