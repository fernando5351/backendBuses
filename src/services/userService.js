const boom = require('@hapi/boom');
const { models } = require('../../libs/sequelize');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

class UserServie {

	async create(data) {
		try {
			const pass = await bcrypt.hash(data.password, 10);
			const tokenCode = crypto.randomBytes(5).toString('hex');
			const userData = {
				...data,
				password: pass,
				verificationCode: tokenCode
			}
			const user = await models.User.create(userData);
			return {
				status: 201,
				message:"New User created",
				user
			};
		} catch (error) {
			console.log('Error in creating a new user')
			throw error;
		}
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

	async getByEmail(email) {
		const user = await models.User.findOne({
			where:{ email }
		});
		if (!user) {
			throw boom.notFound('User not found!');
		}
		return {
			status: 302,
			message: `User ${email} fetched`,
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
