const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const MailerService = require('./mailerService');
const { models } = require('../../libs/sequelize');

const service = new MailerService();
const bodyHtml = fs.readFileSync(path.join(__dirname, '../utils/mail/verify.mail.html'), 'UTF-8');

class UserServie {
	code() {
		const caracteres = '0123456789';
		let codigo = '';

		for (let i = 1; i < 6; i += i) {
			const indice = crypto.randomInt(1, caracteres.length);
			codigo += caracteres[indice];
		}
		return codigo;
	}

	async create(data) {
		const pass = await bcrypt.hash(data.password, 10);
		const userData = {
			...data,
			password: pass,
			verificationCode: this.code(),
		};
		const user = await models.User.create(userData);
		let html = bodyHtml.replace('{{message}}', 'Your verification code is:');
		html = bodyHtml.replace('{{code}}', user.dataValues.verificationCode);
		html = html.replace('{{username}}', user.dataValues.username);
		html = html.replace('{{info}}', 'Keep in mind that this code is for single use.');
		await service.sendMail(user, 'verification code', html);
		return {
			status: 201,
			message: 'New User created',
			user,
		};
	}

	async getAll() {
		const user = await models.User.findAll({
			include: ['role'],
		});
		if (!user) {
			throw boom.notFound('No records found');
		} else {
			return Promise.resolve({
				status: 200,
				message: 'All Users fetched Successfully!',
				user,
			});
		}
	}

	async getByPk(id, payload) {
		const user = await models.User.findByPk(id, {
			include: ['role'],
		});
		if (!user) {
			throw boom.notFound('User not found!');
		}
		if (payload) {
			if (payload?.sub !== user.id) {
				throw boom.unauthorized('you are not authorized');
			}
		}
		return {
			status: 302,
			message: `User ${id} fetched`,
			user,
		};
	}

	async getByEmail(email) {
		const user = await models.User.findOne({
			where: { email },
			include: ['role'],
		});
		return {
			status: 302,
			message: `User ${email} fetched`,
			user,
		};
	}

	async update(id, data, payload) {
		const { user } = await this.getByPk(id, payload);
		let dto;
		if (data.password) {
			dto = {
				...data,
				password: await bcrypt.hash(data.password, 10),
			};
		} else {
			dto = data;
		}
		const res = await user.update(dto);
		return Promise.resolve({
			status: 202,
			message: `User with id:${res[0]} updated successfully!`,
			updated_at: Date.now(),
			user,
		});
	}

	async delete(id, payload) {
		const { user } = await this.getByPk(id, payload);
		await user.destroy();
		return Promise.resolve({
			status: 202,
			message: 'Deleted',
		});
	}
}

module.exports = UserServie;
