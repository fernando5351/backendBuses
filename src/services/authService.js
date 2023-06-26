const jwt = require('jsonwebtoken');
const { config } = require('../../config/config');

class AuthService {

	async generateToken(user) {
		const payload = {
			sub: user.user.id,
			role: user.user.roleId
		}
		const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '10 days' });
		delete user.user.password
		return {
			...user,
			token
		};
	}
}

module.exports = AuthService;
