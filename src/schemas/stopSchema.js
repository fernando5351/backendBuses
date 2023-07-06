const joi = require('joi');

const id = joi.number().integer();
const stopName = joi.string().min(3).max(25);
const lat = joi.number().precision(6);
const long = joi.number().precision(6);

const createStop = joi.object({
	lat: lat.required(),
	long: long.required(),
	stopName: stopName.required(),
});

const updateStop = joi.object({
	lat,
	long,
	stopName,
});

const getStop = joi.object({
	id: id.required(),
});

module.exports = {
	createStop,
	getStop,
	updateStop,
};
