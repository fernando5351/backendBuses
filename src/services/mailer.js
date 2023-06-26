const nodemailer = require('nodemailer');
const { config } = require('../../config/config');
const boom = require('@hapi/boom');

class Mailer {

	async mail(user, affair, body){
		const transporter = nodemailer.createTransport({
			service: 'smtp.gmail.com',
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
				console.log(error);
				throw boom.badRequest(error);
			} else {
				console.log(info);
				return info;
			}
		});
	}

}

module.exports = Mailer;
