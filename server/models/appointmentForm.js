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

    return AppointmentForm;
    //relaciones
    //
};
