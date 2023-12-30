// // fundraising.js

// module.exports = (sequelize, DataTypes) => {
//     const Fundraising = sequelize.define('Fundraising', {
//       title: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       description: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//       },
//       goalAmount: {
//         type: DataTypes.FLOAT,
//         allowNull: false,
//       },
//       currentAmount: {
//         type: DataTypes.FLOAT,
//         defaultValue: 0,
//       },
//       deadline: {
//         type: DataTypes.DATE,
//         allowNull: false,
//       },
//       status: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//     });
  
//     Fundraising.associate = (models) => {
//       // Asociación con User
//       models.Fundraising.belongsTo(models.User, {
//         foreignKey: 'userId',
//       });
  
//       // Asociación con Organization
//       models.Fundraising.belongsTo(models.Organization, {
//         foreignKey: 'organizationId',
//       });
  
//       models.Fundraising.belongsTo(models.Sede, {
//         foreignKey: 'sedeId',
//       });
//     };
  
//     return Fundraising;
//   };
  

// fundraising.js

module.exports = (sequelize, DataTypes) => {
  const Fundraising = sequelize.define('Fundraising', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    goalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    currentAmount: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Nuevos campos relacionados con la cuenta bancaria
    currentAccount: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bankName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rutCompany: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    holder: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Fundraising.associate = (models) => {
    // Asociación con User
    models.Fundraising.belongsTo(models.User, {
      foreignKey: 'userId',
    });

    // Asociación con Organization
    models.Fundraising.belongsTo(models.Organization, {
      foreignKey: 'organizationId',
    });

    models.Fundraising.belongsTo(models.Sede, {
      foreignKey: 'sedeId',
    });
  };

  return Fundraising;
};
