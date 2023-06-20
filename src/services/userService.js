const boom = require('@hapi/boom');
const { models } = require('../../libs/sequelize');

class UserServie {
	async create(data) {
		try{
			const newUser = await models.User.create(data);
			return {
				status: 201,
				message:"New User created",
				newUser
			};
		}catch (error){
					throw error;
		};
	}

	async getAll(){
		let user =  await models.User.findAll();
		if(!user || Array.isArray(user)){
			throw boom.notFound("No records found");
		} else {
			return Promise.resolve({
				status: 200,
				message:'All Users fetched Successfully!',
				user
			});
		}
	}

	async getByPk(id) {
		const user = await models.User.findByPk(id);
		if (!user) {
			throw boom.notFound('User not found!');
		}
		return {
			status: 302,
			message: `User ${id} fetched`,
			user
		}
	}

	async update(id, data) {
		const user = await this.getByPk(id);
		const res = await user.update(data);
		return Promise.resolve({
			status: 202,
			message:`User with id:${res[0]} updated successfully!`,
			updated_at : Date.now(),
			user
		})
	}

	async delete(id){
		const { user } = await this.getByPk(id);
		await user.destroy();
		return Promise.resolve({
			status: 202,
			message:"Deleted"
		});
	}

}

module.exports = UserServie;
