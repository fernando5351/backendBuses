const router = require('express').Router();
const passport = require('passport');

const { login, recovery, recoveryPassword } = require('../schemas/userSchema');
const validatorHandler = require('../../middlewares/validatorHandler');
const AuthService = require('../services/authService');
const UserService = require('../services/userService');

const authService = new AuthService();
const userService = new UserService();

router.post(
	'/login',
	validatorHandler(login, 'body'),
	passport.authenticate('local', { session: false }),
	async (req, res, next) => {
		try {
			const { user } = req;
			const response = await authService.generateToken(user);
			res.status(302).json(response);
		} catch (error) {
			next(error);
		}
	},
);

router.post(
	'/recovery',
	validatorHandler(recovery, 'body'),
	async (req, res, next) => {
		try {
			const { email } = req.body;
			const user = await userService.getByEmail(email);
			const token = await authService.recoveryAuth(user);
			const message = await authService.sendMailRecovery(user, token);
			res.status(200).json(message);
		} catch (error) {
			next(error);
		}
	},
);

router.post(
	'/recovery/password',
	validatorHandler(recoveryPassword, 'body'),
	passport.authenticate('jwt', { session: false }),
	async (req, res, next) => {
		try {
			const token = req.user;
			const data = await authService.changePassword(token, req.body);
			res.json(data);
		} catch (error) {
			next(error);
		}
	},
);

router.get(
	'/recovery',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		const { token } = req.query;
		// eslint-disable-next-line no-console
		console.log(token);
		res.render('index');
	},
);

module.exports = router;
