// // petPhoto.js

// module.exports = (sequelize, DataTypes) => {
//     const PetPhoto = sequelize.define("PetPhoto", {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//       },
//       // Otros campos específicos de la foto de la mascota
//       images: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       // Otros campos según tus necesidades
//     });
  
//     PetPhoto.associate = (models) => {
//       // Asociación con Pet
//       models.PetPhoto.belongsTo(models.Pet, {
//         foreignKey: 'petId', // Nombre de la clave foránea en la tabla de fotos de mascotas
//       });
//     };
  
//     return PetPhoto;
//   };
  



// petPhoto.js

module.exports = (sequelize, DataTypes) => {
  const PetPhoto = sequelize.define("PetPhoto", {
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Otros campos según tus necesidades
  });

  PetPhoto.associate = (models) => {
    // Asociación con Pet
    models.PetPhoto.belongsTo(models.Pet, {
      foreignKey: 'petId', // Nombre de la clave foránea en la tabla de fotos de mascotas
    });
  };

  return PetPhoto;
};