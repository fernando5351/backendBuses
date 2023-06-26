const { Strategy } = require('passport-local');
const UserService = require('../../../services/userService');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const service = new UserService;

const localStrategy = new Strategy({
		usernameField: 'email',
    passwordField: 'password'
  }, async (email, password, done) =>{
		const user = await service.getByEmail(email);
		if(!user){
			 return done(boom.unauthorized('mail not found'), false);
		}
		const pass = await bcrypt.compare(password, user.user.dataValues.password);
		console.log(user.user.dataValues.password + ' => password ' + pass);
		if (!pass ) {
			return done(boom.unauthorized('incorrect password'), false);
		}
		done(null, user);
	}
);



module.exports=localStrategy;
