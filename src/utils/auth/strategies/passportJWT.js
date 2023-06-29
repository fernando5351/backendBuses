const { Strategy, ExtractJwt } = require('passport-jwt');
const { config } = require('../../../../config/config');

const options = {
	secretOrKey: config.jwtSecret,
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtStrategy = new Strategy(options, (payload, done) => {
	if (!payload) {
		done('No token provided', false);
	}
	return done(null, payload);
});

const recovery = {
	secretOrKey: config.recoverySecret,
	jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
};

const jwtStrategyRecov = new Strategy(recovery, (payload, done) => {
	if (!payload) {
		done('No token provided', false);
	}
	return done(null, payload);
});

module.exports = {
	jwtStrategy,
	jwtStrategyRecov,
};
