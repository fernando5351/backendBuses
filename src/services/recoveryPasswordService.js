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

	async getByPk(userId, token) {
		const conditions = {
			...token,
			userId,
			status: false,
		};
		const recovery = await models.Recovery.findOne({ where: conditions });
		return Promise.resolve(
			recovery,
		);
	}

	async update(id, token) {
		const recovery = await this.getByPk(id, token);
		const changes = {
			status: true,
		};
		const recoveryUpdated = await recovery.update(changes);
		return Promise.resolve({
			status: 202,
			message: 'Updated!',
			recoveryUpdated,
		});
	}
}

module.exports = RecoveryService;
