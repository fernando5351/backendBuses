const joi = require('joi');

const id = joi.number().integer();
const name = joi.string().min(3).max(100);
const status = joi.boolean();

const createRol = joi.object({
	name: name.required(),
	status
});

const getRol = joi.object({
	id: id.required()
});

const updatedRole = joi.object({
	name,
	status
});

module.exports = {
	createRol,
	getRol,
	updatedRole
};
