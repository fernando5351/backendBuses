const router = require('express').Router();
const passport = require('passport');

const { login, recovery } = require('../schemas/userSchema');
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

router.post('/recovery/password', async (req, res, next) => {
	passport.authenticate('jwtRecovery', { session: false }, async (err, user) => {
		try {
			if (!user) {
				res.redirect('unauthorized');
			} else {
				const token = req.query;
				const userRecov = await recoveryService.getByPk(user.sub, token);
				if (!userRecov) {
					res.redirect('unauthorized');
				} else {
					await recoveryService.update(user.sub, token);
					const data = await authService.changePassword(user, req.body);
					res.json(data);
				}
			}
		} catch (error) {
			next(error);
		}
	})(req, res, next);
});

router.get('/recovery', (req, res, next) => {
	passport.authenticate('jwtRecovery', { session: false }, async (err, user) => {
		const token = req.query;
		if (!user) {
			res.render('unauthorized');
		} else {
			const userRecov = await recoveryService.getByPk(user.sub, token);
			if (!userRecov) {
				res.render('tokenUsed');
			} else {
				res.render('index');
			}
		}
	})(req, res, next);
});

router.get(
	'/unauthorized',
	async (req, res) => {
		res.render('unauthorized');
	},
);

router.get(
	'/changed',
	async (req, res) => {
		res.render('changed');
	},
);

module.exports = router;
