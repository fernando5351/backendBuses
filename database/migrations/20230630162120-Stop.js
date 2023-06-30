const { STOP_TABLE, StopSchema } = require('../models/StopModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface) {
		await queryInterface.createTable(STOP_TABLE, StopSchema);
	},
	async down(queryInterface) {
		return queryInterface.dropTable(STOP_TABLE);
	},
};
