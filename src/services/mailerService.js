const nodemailer = require('nodemailer');
const { config } = require('../../config/config');
const boom = require('@hapi/boom');

class Mailer {

	async sendMail(user, affair, body){
		const transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			secure: true,
			port: 465,
			auth: {
				user: config.gmailUser,
				pass: config.gmailPassword
			}
		});

		const mailOptions = {
			from: `${config.gmailUser}`,
			to: user.email,
			subject: affair,
			html: body
		};

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				throw boom.badRequest(error);
			} else {
				return info;
			}
		});
	}

}

module.exports = Mailer;
