'use strict';

const { ROLE_TABLE, roleSchema } = require('../models/RoleModel')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(ROLE_TABLE, roleSchema);
  },

  async down (queryInterface) {
    return queryInterface.dropTable(ROLE_TABLE);
  }
};
