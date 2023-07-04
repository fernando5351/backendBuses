const router = require('express').Router();
const passport = require('passport');

const { login, recovery, recoveryPassword } = require('../schemas/userSchema');
const validatorHandler = require('../../middlewares/validatorHandler');
const AuthService = require('../services/authService');
const UserService = require('../services/userService');
const RecoveryService = require('../services/recoveryPasswordService');

const authService = new AuthService();
const userService = new UserService();
const recoveryService = new RecoveryService();

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
			await recoveryService.createRecovery({
				...user.user.dataValues,
				token,
			});
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
			const payload = req.user;
			const token = req.query;
			console.log(token);
			const user = await recoveryService.getByPk(payload.sub);
			console.log(user.recovery);
			if (user.recovery.status === false && user.recovery.token === token) {
				await recoveryService.update(payload.sub);
				const data = await authService.changePassword(payload, req.body);
				res.json(data);
			} else {
				res.render('unauthorized');
			}
		} catch (error) {
			next(error);
		}
	},
);

router.get('/recovery', (req, res, next) => {
	passport.authenticate('jwtRecovery', { session: false }, (err, user) => {
		console.log(user);

		if (!user) {
			res.render('unauthorized');
		} else {
			res.render('index');
		}
	})(req, res, next);
});

router.get(
	'/unauthorized',
	async (req, res) => {
		res.render('unauthorized');
	},
);

module.exports = router;
