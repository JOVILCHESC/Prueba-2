// // verificationForm.js
// module.exports = (sequelize, DataTypes) => {
//     const VerificationForm = sequelize.define("VerificationForm", {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//       },
//       // Otros campos específicos del formulario de verificación
//       // Por ejemplo, podrías tener campos para preguntas específicas
//       names: {
//         type: DataTypes.TEXT,
//       },
//       firstLastName: {
//         type: DataTypes.TEXT,
//       },
//       secondLastName: {
//         type: DataTypes.STRING(10),
//       },
//       reunion: {
//         type: DataTypes.TEXT,
//       },
//       compromise: {
//         type: DataTypes.TEXT,
//       },
//       // Otros campos según tus necesidades
//     });
  
//     VerificationForm.associate = (models) => {
//       // Asociación con AdoptionRequest
//       models.VerificationForm.hasMany(models.AdoptionRequest, {
//         foreignKey: 'adoptionRequestId',
//       });
//       // Asociación con User
//       models.VerificationForm.belongsTo(models.User, {
//         foreignKey: 'userId',
//       });
//       //asociacion con Pet
//       models.VerificationForm.belongsTo(models.Pet, {
//         foreignKey: 'petId',
//       });
//     };
  
//     return VerificationForm;
//   };
  



// verificationForm.js
module.exports = (sequelize, DataTypes) => {
  const VerificationForm = sequelize.define("VerificationForm", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    names: {
      type: DataTypes.TEXT,
    },
    firstLastName: {
      type: DataTypes.STRING(20),
    },
    secondLastName: {
      type: DataTypes.STRING(20),
    },
    rut: {
      type: DataTypes.STRING(15), // Assuming the RUT is a string with a maximum length of 12
    },
    dateOfBirth: {
      type: DataTypes.DATE,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false, // Assuming email is required
    },
    phoneNumber: {
      type: DataTypes.STRING(20), // Adjust the length based on your requirements
    },
    region: {
      type: DataTypes.STRING,
    },
    comuna: {
      type: DataTypes.STRING,
    },
    direccion: {
      type: DataTypes.TEXT,
    },
    ask_1: {
      type: DataTypes.TEXT,
    },
    ask_2: {
      type: DataTypes.TEXT,
    },
    ask_3: {
      type: DataTypes.TEXT,
    },
    ask_4: {
      type: DataTypes.TEXT,
    },
    ask_5: {
      type: DataTypes.TEXT,
    },
    agreeTerms: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Assuming the default value is false
    },
    reunion: {
      type: DataTypes.TEXT,
    },
    compromise: {
      type: DataTypes.TEXT,
    },
  });

  VerificationForm.associate = (models) => {
    models.VerificationForm.hasMany(models.AdoptionRequest, {
      foreignKey: 'adoptionRequestId',
    });
    models.VerificationForm.belongsTo(models.User, {
      foreignKey: 'userId',
    });
    models.VerificationForm.belongsTo(models.Pet, {
      foreignKey: 'petId',
    });
  };

  return VerificationForm;
};
