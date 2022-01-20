'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Brute', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      count: {
        type: Sequelize.INTEGER
      },
      first_request: {
        type: 'TIMESTAMP',
        allowNull: true
      },
      last_request : {
        type: 'TIMESTAMP',
        allowNull: true
      },
      expires : {
        type: 'TIMESTAMP',
        allowNull: true
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Brute');
  }
};
