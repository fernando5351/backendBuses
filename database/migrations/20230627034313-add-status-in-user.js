'use strict';

const { USER_TABLE} = require('../models/UserModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {
		await queryInterface.addColumn(USER_TABLE, 'status', {
			allowNull: false,
			type: DataTypes.BOOLEAN,
			defaultValue: true,
			field: 'status',
		});
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(USER_TABLE,'status');
  }
};
