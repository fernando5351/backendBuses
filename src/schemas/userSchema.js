const joi = require('joi');

const id = joi.number().integer();
const username = joi.string().min(3).max(25);
const email = joi.string().email().min(5).max(75);
const password = joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).min(3).max(15);
const roleId = joi.number().integer();
const status = joi.boolean();

const createUser = joi.object({
	username: username.required(),
	email: email.required(),
	password: password.required(),
	roleId: roleId.required(),
	status,
});

const getUser = joi.object({
	id: id.required(),
});

const updateUser = joi.object({
	username,
	email,
	password,
	roleId,
	status,
});

const login = joi.object({
	email: email.required(),
	password: password.required(),
});

module.exports = {
	createUser,
	getUser,
	updateUser,
	login,
};
