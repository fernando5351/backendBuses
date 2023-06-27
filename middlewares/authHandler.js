const boom = require('@hapi/boom');

function checkRole(...role) {
	return (req, res, next) => {
		console.log(role.includes(req.user.role) && req.user.status === true && req.user.subject);
		if (role.includes(req.user.role) && req.user.status === true) {
			next();
		} else {
			throw boom.unauthorized('You are not authorized to perform this action!');
		}
	};
}

module.exports = {
	checkRole,
}
