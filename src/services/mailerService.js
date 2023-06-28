const nodemailer = require('nodemailer');
const boom = require('@hapi/boom');
const { config } = require('../../config/config');

class Mailer {
	// eslint-disable-next-line class-methods-use-this
	async sendMail(user, affair, body) {
		const transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			secure: true,
			port: 465,
			auth: {
				user: config.gmailUser,
				pass: config.gmailPassword,
			},
		});

		const mailOptions = {
			from: `${config.gmailUser}`,
			to: user.email,
			subject: affair,
			html: body,
		};

		return new Promise((resolve, reject) => {
			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					reject(boom.badRequest(error));
				} else {
					resolve(info);
				}
			});
		});
	}
}

module.exports = Mailer;
