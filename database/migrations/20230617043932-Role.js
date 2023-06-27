'use strict';

const { ROLE_TABLE, RoleSchema } = require('../models/RoleModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(ROLE_TABLE, RoleSchema);
		await queryInterface.bulkInsert(ROLE_TABLE, [{
      name: 'admin',
    }], {});
  },

  async down (queryInterface) {
    return queryInterface.dropTable(ROLE_TABLE);
  }
};
