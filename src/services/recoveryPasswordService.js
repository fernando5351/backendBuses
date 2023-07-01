const boom = require('@hapi/boom');
const { models } = require('../../libs/sequelize');

class RecoveryService {
	async createRecovery(data) {
		const recovery = await models.Recovery.create(data);
		return Promise.resolve({
			status: 201,
			message: 'Recovery created successfully',
			recovery,
		});
	}

	async getByPk(userId) {
		const recovery = await models.Recovery.findOne({ where: { userId } });
		if (!recovery) {
			throw boom.notFound('Record not Found');
		}
		return Promise.resolve({
			status: 200,
			message: 'Role Fetched',
			recovery,
		});
	}

	async update(id, data) {
		const { recovery } = await this.getByPk(id);
		const recoveryUpdated = await recovery.update(data);
		return Promise.resolve({
			status: 202,
			message: 'Updated!',
			recoveryUpdated,
		});
	}
}

module.exports = RecoveryService;
