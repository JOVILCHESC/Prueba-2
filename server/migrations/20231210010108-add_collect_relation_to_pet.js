'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Pets', 'collectId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Collects', // Nombre de la tabla Collects
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Pets', 'petId');
  }
};
