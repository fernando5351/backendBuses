const boom = require('@hapi/boom');

function validatorHandler(schema, property){
	return async (req, res, next) => {
		try{
			const data = req[property];
			const { error } = schema.validate(data, { abortEarly: false});
		}
		catch(err){
			next(boom.badRequest('Validation failed', err));
		}
	}
}
