'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('VerificationForms', 'newPetId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Pets', // Nombre de la tabla de destino
        key: 'id', // Clave primaria de la tabla de destino
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('VerificationForms', 'newPetId');
  }
};
