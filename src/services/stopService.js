const boom = require('@hapi/boom');
const { models } = require('../../libs/sequelize');

class StopService {
	async createStop(data) {
		const Stop = await models.Stop.create(data);
		return Promise.resolve({
			status: 201,
			message: 'Stop created successfully',
			Stop,
		});
	}

	async getAll() {
		const Stops = await models.Stop.findAll();
		if (!Stops) {
			throw boom.notFound('No records found');
		} else {
			return Promise.resolve({
				status: 200,
				message: 'All Stops fetched Successfully!',
				Stops,
			});
		}
	}

	async getByPk(id) {
		const Stop = await models.Stop.findOne({ where: { id } });
		if (!Stop) {
			throw boom.notFound('Record not Found');
		}
		return Promise.resolve({
			status: 200,
			message: `Stop ${id} Fetched`,
			Stop,
		});
	}

	async update(id, data) {
		const { Stop } = await this.getByPk(id);
		const StopUpdated = await Stop.update(data);
		return Promise.resolve({
			status: 202,
			message: 'Updated!',
			StopUpdated,
		});
	}

	async delete(id) {
		const { Stop } = await this.getByPk(id);
		const data = Stop.destroy();
		return Promise.resolve({
			status: 202,
			message: 'Deleted',
			data,
		});
	}
}

module.exports = StopService;
