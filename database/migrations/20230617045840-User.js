'use strict';

const { USER_TABLE, userSchema} = require('../models/UserModel')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(USER_TABLE,userSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(USER_TABLE);
  }
};
