const router = require('express').Router();
const passport = require('passport');
const validatorHandler = require('../../middlewares/validatorHandler');
const { checkRole } = require('../../middlewares/authHandler');
const UserServie = require('../services/userService');
const { getUser, createUser, updateUser } = require('../schemas/userSchema');

const service = new UserServie();

router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	checkRole('admin'),
	async (req, res, next) => {
		try {
			const data = await service.getAll();
			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	},
);

router.get(
	'/:id',
	validatorHandler(getUser, 'params'),
	passport.authenticate('jwt', { session: false }),
	checkRole('customer', 'admin'),
	async (req, res, next) => {
		try {
			const payload = req.user;
			const { id } = req.params;
			const data = await service.getByPk(id, payload);
			res.status(302).json(data);
		} catch (error) {
			next(error);
		}
	},
);

router.post(
	'/register',
	validatorHandler(createUser, 'body'),
	async (req, res, next) => {
		try {
			const data = req.body;
			const user = await service.create(data);
			res.status(201).json(user);
		} catch (error) {
			next(error);
		}
	},
);

router.patch(
	'/:id',
	validatorHandler(getUser, 'params'),
	validatorHandler(updateUser, 'body'),
	passport.authenticate('jwt', { session: false }),
	checkRole('customer', 'admin'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const payload = req.user;
			const data = req.body;
			const user = await service.update(id, data, payload);
			res.status(202).json(user);
		} catch (error) {
			next(error);
		}
	},
);

router.delete(
	'/:id',
	validatorHandler(getUser, 'params'),
	passport.authenticate('jwt', { session: false }),
	checkRole('customer', 'admin', 'personal'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const payload = req.user;
			const data = await service.delete(id, payload);
			res.status(202).json(data);
		} catch (error) {
			next(error);
		}
	},
);

module.exports = router;
