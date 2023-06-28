const jwt = require('jsonwebtoken');
const { config } = require('../../config/config');

class AuthService {
	static async generateToken(user) {
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
}

module.exports = AuthService;
