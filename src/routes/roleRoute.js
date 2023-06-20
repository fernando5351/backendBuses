const router = require('express').Router();
const Service = require('../services/roleService');
const { createRol, getRol, updatedRole } = require('../schemas/roleSchema');
const validatorHandler = require('../../middlewares/validatorHandler')

const service = new Service;

router.post('/',
	validatorHandler(createRol, 'body'),
	async (req, res, next) => {
		try {
			const data = req.body;
			const role = await service.createRole(data);
			res.status(201).json(role)
		} catch (error) {
			next(error);
		}
	}
);

router.get('/', async(req, res, next)=>{
	try {
		const roles = await service.getAll();
		return res.status(200).json(roles);
	} catch (error) {
		next(error);
	}
});

router.get('/:id',
	validatorHandler(getRol, 'params'),
	async(req, res, next)=>{
	try {
		const { id } = req.params;
		const roles = await service.getByPk(id);
		return res.status(302).json(roles);
	} catch (error) {
		next(error);
	}
});

router.patch('/:id',
	validatorHandler(getRol, 'params'),
	validatorHandler(updatedRole, 'body'),
	async(req, res, next)=>{
		try{
			const { id }= req.params;
			const updateData = req.body;
			const role = await service.update(id, updateData);
			return res.status(202).json(role);
		}catch(err){
				next(err);
		}
	}
)

router.delete('/:id',
	validatorHandler(getRol, 'params'),
	async(req,res,next)=>{
		try{
			const { id } = req.params;
			const data = await service.delete(id);
			return res.status(202).json(data);
		}catch(err){
				next(err);
		}
	}
)


module.exports = router;
