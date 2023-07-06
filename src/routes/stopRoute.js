const router = require('express').Router();
const passport = require('passport');
const Service = require('../services/stopService');
const { createStop, getStop, updatedStop } = require('../schemas/stopSchema');
const validatorHandler = require('../../middlewares/validatorHandler');
const { checkRole } = require('../../middlewares/authHandler');

const service = new Service();

router.post(
	'/',
	validatorHandler(createStop, 'body'),
	passport.authenticate('jwt', { session: false }),
	checkRole('admin'),
	async (req, res, next) => {
		try {
			const data = req.body;
			const role = await service.createStop(data);
			res.status(201).json(role);
		} catch (error) {
			next(error);
		}
	},
);

router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	checkRole('admin'),
	async (req, res, next) => {
		try {
			const roles = await service.getAll();
			res.status(200).json(roles);
		} catch (error) {
			next(error);
		}
	},
);

router.get(
	'/:id',
	validatorHandler(getStop, 'params'),
	passport.authenticate('jwt', { session: false }),
	checkRole('admin'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const roles = await service.getByPk(id);
			res.status(302).json(roles);
		} catch (error) {
			next(error);
		}
	},
);

router.patch(
	'/:id',
	validatorHandler(updatedStop, 'body'),
	passport.authenticate('jwt', { session: false }),
	checkRole('admin'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const updateData = req.body;
			const role = await service.update(id, updateData);
			res.status(202).json(role);
		} catch (err) {
			next(err);
		}
	},
);

router.delete(
	'/:id',
	validatorHandler(getStop, 'params'),
	passport.authenticate('jwt', { session: false }),
	checkRole('admin'),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const data = await service.delete(id);
			res.status(202).json(data);
		} catch (err) {
			next(err);
		}
	},
);

module.exports = router;