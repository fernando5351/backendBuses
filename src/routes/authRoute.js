const router = require('express').Router();
const passport = require('passport');
const { login } = require('../schemas/userSchema');
const validatorHandler = require('../../middlewares/validatorHandler');
const service = require('../services/authService');

router.post(
	'/login',
	validatorHandler(login, 'body'),
	passport.authenticate('local', { session: false }),
	async (req, res, next) => {
		try {
			const { user } = req;
			const response = await service.generateToken(user);
			res.status(302).json(response);
		} catch (error) {
			next(error);
		}
	},
);

module.exports = router;
