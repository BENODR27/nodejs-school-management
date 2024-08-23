'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      username: 'john_doe',
      email: 'john@example.com',
      password: 'hashed_password', // Make sure passwords are hashed
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'jane_doe',
      email: 'jane@example.com',
      password: 'hashed_password',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
