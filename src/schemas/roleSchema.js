const joi = require('joi');

const id = joi.number().integer();
const name = joi.string().min(3).max(100);

const createRol = joi.object({
	name: name.required()
});

const getRol = joi.object({
	id: id.require()
});

module.exports = {
	createRol,
	getRol
};
