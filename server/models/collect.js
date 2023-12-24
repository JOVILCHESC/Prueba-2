module.exports = (sequelize, DataTypes) => {
    const Collect = sequelize.define("Collect", {
        amountRaised: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
          },
          targetAmount: {
            type: DataTypes.FLOAT,
            allowNull: false,
          },
          deadline: {
            type: DataTypes.DATE,
            allowNull: false,
          },
      // Otros campos según los detalles específicos que necesites.
    });
  
    Collect.associate = (models) => {
      // Asociación con User
      models.Collect.belongsTo(models.User, {
        foreignKey: 'userId', // Nombre de la clave foránea en la tabla de mascotas
      });
  
      // Asociación con Organization
      models.Collect.belongsTo(models.Organization, {
        foreignKey: 'organizationId', // Nombre de la clave foránea en la tabla de mascotas
      });
      // Asociación con Pet
    // Nota: Esto asume que la columna en la tabla Collect que se refiere a Pet es 'petId'
      models.Collect.belongsTo(models.Pet, {
        foreignKey: 'petId',
      });
      models.Collect.belongsTo(models.Sede, { 
        foreignKey: 'sedeId' 
      });

    };
  
    return Collect;
  };
  



 // En tu controlador o ruta para obtener mascotas con colectas
module.exports.getPetsWithCollects = async (req, res) => {
  try {
    const pets = await Pet.findAll({
      include: {
        model: Collect,
        attributes: ['id', 'amountRaised', 'targetAmount', 'deadline'],
      },
    });

    res.status(200).json({ success: true, pets });
  } catch (error) {
    console.error('Error al obtener mascotas con colectas:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};

