const { Role, RoleSchema } = require('./RoleModel');
const { userSchema, User } = require('./UserModel');
const { Stop, StopSchema } = require('./StopModel');

function setupModels(sequelize) {
	Role.init(RoleSchema, Role.config(sequelize));
	User.init(userSchema, User.config(sequelize));
	Stop.init(StopSchema, Stop.config(sequelize));
	// relations
	Role.associate(sequelize.models);
	User.associate(sequelize.models);
	// Stop.associate(sequelize.models);
}

module.exports = setupModels;
