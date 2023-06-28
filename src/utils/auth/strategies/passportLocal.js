const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const UserService = require('../../../services/userService');

const service = new UserService();

const localStrategy = new Strategy({
	usernameField: 'email',
	passwordField: 'password',
}, async (email, password, done) => {
	const user = await service.getByEmail(email);
	if (!user.user) {
		return done(boom.unauthorized('mail not found'), false);
	}
	const pass = await bcrypt.compare(password, user.user.dataValues.password);

	if (!pass) {
		return done(boom.unauthorized('incorrect password'), false);
	}
	return done(null, user);
});

module.exports = localStrategy;
