const boom = require('@hapi/boom');
const { models } = require('../../libs/sequelize');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mailerService = require('./mailerService');
const fs = require('fs');
const path = require('path');

const service = new mailerService;
const bodyHtml = fs.readFileSync(path.join(__dirname, '../utils/mail/verify.mail.html'), 'UTF-8');

class UserServie {

	code(){
		const caracteres = '0123456789';
		let codigo = '';

		for (let i = 1; i < 6; i++) {
			const indice = crypto.randomInt(1, caracteres.length);
			codigo += caracteres[indice];
		}
		return codigo;
	}

	async create(data) {
		try {
			const pass = await bcrypt.hash(data.password, 10);
			const userData = {
				...data,
				password: pass,
				verificationCode: this.code()
			}
			const user = await models.User.create(userData);
			let html = bodyHtml.replace('{{code}}', user.dataValues.verificationCode);
			html = html.replace('{{username}}', user.dataValues.username);
			await service.sendMail(user, 'verification code', html);
			return {
				status: 201,
				message:"New User created",
				user
			};
		} catch (error) {
			throw error;
		}
	}

	async getAll(){
		let user =  await models.User.findAll();
		if(!user){
			throw boom.notFound("No records found");
		} else {
			return Promise.resolve({
				status: 200,
				message:'All Users fetched Successfully!',
				user
			});
		}
	}

	async getByPk(id, payload) {
		const user = await models.User.findByPk(id);
		if (!user) {
			throw boom.notFound("User not found!");
		}
		if(payload) {
			if (payload?.sub !== user.id) {
				throw boom.unauthorized("you are not authorized");
			}
		}
		return {
			status: 302,
			message: `User ${id} fetched`,
			user
		};
	}

	async getByEmail(email) {
		const user = await models.User.findOne({
			where:{ email }
		});
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
