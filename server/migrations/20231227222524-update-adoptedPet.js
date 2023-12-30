'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('adopted_pet', 'sedeId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'sedes',
        key: 'id',
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('adopted_pet', 'sedeId');
  }
};
