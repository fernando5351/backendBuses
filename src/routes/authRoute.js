const router = require('express').Router();
const { login } = require('../schemas/userSchema');
const validatorHandler = require('../../middlewares/validatorHandler');
const AuthService = require('../services/authService');
const passport = require('passport');

const service =  new AuthService;

router.post('/login',
	validatorHandler(login, 'body'),
	passport.authenticate('local', { session: false }),
	async( req, res, next)=>{
		try {
			const user = req.user;
			console.log(user);
			const response = await service.generateToken(user);
			res.status(302).json(response);
		} catch (error) {
			next(error)
		}
	}
)

module.exports = router;
