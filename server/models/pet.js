// pet.js

module.exports = (sequelize, DataTypes) => {
    const Pet = sequelize.define("Pet", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // Otros campos específicos de la mascota
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      species: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      race: {
        type: DataTypes.STRING,
      },
      age: {
        type: DataTypes.INTEGER,
      },
      
      sex: {
        type: DataTypes.STRING,
      },
      date_born: {
        type: DataTypes.DATE,
      },
      description: {
        type: DataTypes.TEXT,
      },
      
      // petPhotos: {
      //   type: DataTypes.STRING,
      //   allowNull: true,
      // },
      availableForAdoption: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: true,
      },
      // Otros campos según tus necesidades
    });
  
    Pet.associate = (models) => {
      // Asociación con User
      models.Pet.belongsTo(models.User, {
        foreignKey: 'userId', // Nombre de la clave foránea en la tabla de mascotas
      });
  
      // Asociación con Organization
      models.Pet.belongsTo(models.Organization, {
        foreignKey: 'organizationId', // Nombre de la clave foránea en la tabla de mascotas
      });

      models.Pet.belongsTo(models.Sede, { 
        foreignKey: 'sedeId' 
      });
      //asociacion con adoptionRequest
      //UNA MASCOTA PUEDE TENER muchas solicitudes de adopcion, luego el 
      //admin o user = organization determinar quien esta aprobado para tener la mascota LUEGO SE ACTUALIZARA SU ESTADO Y YA NO APARECERA en la lista de mascotas por adoptar
      models.Pet.hasMany(models.AdoptionRequest, {
        foreignKey: 'petId', // Nombre de la clave foránea en la tabla de 
      });
      //asociacion con petPhoto
      models.Pet.hasMany(models.PetPhoto, {
        foreignKey: 'petId', // Nombre de la clave foránea en la tabla de 
      });
    };
  
    return Pet;
  };
  