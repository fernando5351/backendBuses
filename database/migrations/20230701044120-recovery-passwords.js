const { RECOVERY_PASSWORD_TABLE, RecoveryPasswordsModel } = require('../models/RecoveryPasswordModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface) {
		await queryInterface.createTable(RECOVERY_PASSWORD_TABLE, RecoveryPasswordsModel);
	},

	async down(queryInterface) {
		await queryInterface.dropTable(RECOVERY_PASSWORD_TABLE);
	},
};
