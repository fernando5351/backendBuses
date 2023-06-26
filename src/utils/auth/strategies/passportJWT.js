const { Strategy,  ExtractJwt } = require('passport-jwt');
const { config } = require('../../../../config/config');

var options = {
	secretOrKey: config.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

const jwtStrategy = new Strategy(options, (payload, done)=>{
	if(!payload){
		done("No token provided", false);
	}
	return done(null, payload)
});



module.exports = jwtStrategy;
