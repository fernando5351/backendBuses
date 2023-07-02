const boom = require('@hapi/boom');
const { models } = require('../../libs/sequelize');

class RecoveryService {
	async createRecovery(data) {
		const dta = {
			userId: data.id,
			oldPassword: data.password,
			token: data.token,
		};
		const recovery = await models.Recovery.create(dta);
		return Promise.resolve({
			status: 201,
			message: 'Recovery created successfully',
			recovery,
		});
	}

	async getByPk(userId) {
		const recovery = await models.Recovery.findOne({ where: { userId, status: false } });
		if (!recovery) {
			throw boom.notFound('Record not Found');
		}
		return Promise.resolve({
			status: 200,
			message: 'Role Fetched',
			recovery,
		});
	}

	async update(id) {
		const { recovery } = await this.getByPk(id);
		const recoveryUpdated = await recovery.update({ status: true });
		return Promise.resolve({
			status: 202,
			message: 'Updated!',
			recoveryUpdated,
		});
	}
}

module.exports = RecoveryService;
