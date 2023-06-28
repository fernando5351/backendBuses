const boom = require('@hapi/boom');
const { models } = require('../../libs/sequelize');

class RoleService {
	async createRole(data) {
		const role = await models.Role.create(data);
		return Promise.resolve({
			status: 201,
			message: 'Role created successfully',
			role,
		});
	}

	async getAll() {
		const roles = await models.Role.findAll();
		if (!roles) {
			throw boom.notFound('No records found');
		} else {
			return Promise.resolve({
				status: 200,
				message: 'All Roles fetched Successfully!',
				roles,
			});
		}
	}

	async getByPk(id) {
		const role = await models.Role.findOne({ where: { id } });
		if (!role) {
			throw boom.notFound('Record not Found');
		}
		return Promise.resolve({
			status: 200,
			message: `Role ${id} Fetched`,
			role,
		});
	}

	async update(id, data) {
		const { role } = await this.getByPk(id);
		const roleUpdated = await role.update(data);
		return Promise.resolve({
			status: 202,
			message: 'Updated!',
			roleUpdated,
		});
	}

	async delete(id) {
		const { role } = await this.getByPk(id);
		const data = role.destroy();
		return Promise.resolve({
			status: 202,
			message: 'Deleted',
			data,
		});
	}
}

module.exports = RoleService;
