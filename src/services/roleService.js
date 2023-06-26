const boom = require('@hapi/boom');
const { models } = require('../../libs/sequelize');

class RoleService {

	constructor() {}

	async createRole(data) {
		try{
			let role = await models.Role.create(data);
			return Promise.resolve({
				status: 201,
				message : 'Role created successfully',
				role
			});
		}catch (error){
			console.log('Error in creating a new user')
			throw error;
		};
	}

	async getAll(){
		let roles =  await models.Role.findAll();
		if(!roles){
			throw boom.notFound("No records found");
		} else {
			return Promise.resolve({
				status: 200,
				message:'All Roles fetched Successfully!',
				roles
			});
		}
	}

	async getByPk(id){
		let role = await models.Role.findOne({where:{id}});
		if(!role ){
			throw boom.notFound(`Record not Found`);
		}
		return Promise.resolve({
			status: 200,
			message:`Role ${id} Fetched`,
			role
		});
	}

	async update(id, data){
		const { role } = await this.getByPk(id);
		const roleUpdated =  await role.update(data);
		console.log(roleUpdated);
		return Promise.resolve({
			status: 202,
			message:"Updated!",
			roleUpdated
		});
	}

	async delete(id){
		const { role } = await this.getByPk(id);
		const data =  role.destroy();
		return Promise.resolve({
			status: 202,
			message:"Deleted",
			data
		});
	}

}

module.exports = RoleService;
