// CollectImage.js
module.exports = (sequelize, DataTypes) => {
    const CollectImage = sequelize.define('CollectImage', {
      filename: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    CollectImage.associate = (models) => {
      // Asociación con la colecta
      models.CollectImage.belongsTo(models.Collect, {
        foreignKey: 'collectId',
      });
    };
  
    return CollectImage;
  };
  