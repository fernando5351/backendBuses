const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const boom = require('@hapi/boom');

const { config } = require('../../config/config');
const MailerService = require('./mailerService');
const UserService = require('./userService');

const service = new MailerService();
const userService = new UserService();

const bodyHtml = fs.readFileSync(path.join(__dirname, '../utils/mail/verify.mail.html'), 'UTF-8');

class AuthService {
	async generateToken(user) {
		const payload = {
			sub: user.user.id,
			subject: user.user.status,
			role: user.user.role.name,
			status: user.user.role.status,
		};
		const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '10 days' });
		// eslint-disable-next-line no-param-reassign
		delete user.user.password;
		return {
			...user,
			token,
		};
	}

	async recoveryAuth(user) {
		if (!user.user) {
			throw boom.unauthorized();
		}
		const payload = {
			sub: user.user.id,
			email: user.user.email,
		};
		const token = jwt.sign(payload, config.recoverySecret, { expiresIn: '20 minutes' });
		return token;
	}

	async sendMailRecovery(user, token) {
		// const url = `http://localhost:3000/api/v1/auth/recovery?token=${token}`;
		const url = `https://buses-production.up.railway.app/api/v1/auth/recovery?token=${token}`;
		let html = bodyHtml.replace('{{message}}', 'To recover your account click on the following link:');
		html = html.replace('{{code}}', url);
		html = html.replace('{{username}}', user.user.dataValues.username);
		html = html.replace('{{info}}', 'Please note that this verification code is only valid if you have already logged in to our website. If you have not requested this, click on the following link:');
		await service.sendMail(user.user.dataValues, 'verification code', html);
		return {
			status: 200,
			message: 'success',
		};
	}

	async changePassword(user, data) {
		await userService.update(user.sub, data, user);
		return {
			status: 202,
			message: 'updated',
		};
	}
}

module.exports = AuthService;
