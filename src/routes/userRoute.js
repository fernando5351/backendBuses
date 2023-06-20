const validatorHandler = require('../../middlewares/validatorHandler');
const UserServie = require('../services/userService');
const router = require('express').Router();
const { getUser, createUser, updateUser } = require('../schemas/userSchema');

const service = new UserServie;

router.get('/', async(req, res, next)=>{
	try {
		const data = await service.getAll();
		res.status(200).json(data)
	} catch (error) {
		next(error);
	}
});

router.get('/:id',
	validatorHandler(getUser, 'params'),
	async(req, res, next)=> {
		try {
			const { id } = req.params;
			const data = await service.getByPk(id);
			res.status(304).json(data);
		} catch (error) {
			next(error);
		}
	}
);

router.post('/',
	validatorHandler(createUser, 'body'),
	async(req, res, next)=> {
		try {
			const data = req.body;
			const user = await service.create(data);
			res.status(201).json(user);
		} catch (error) {
			next(error);
		}
	}
);

router.patch('/:id',
	validatorHandler(getUser, 'params'),
	validatorHandler(updateUser, 'body'),
	async(req, res, next)=> {
		try {
			const { id } = req.params;
			const data = req.body;
			const user = await service.update(id, data);
			res.status(202).json(user);
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
