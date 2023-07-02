const { Role, RoleSchema } = require('./RoleModel');
const { userSchema, User } = require('./UserModel');
const { Recovery, RecoveryPasswordsModel } = require('./RecoveryPasswordModel');

function setupModels(sequelize) {
	Role.init(RoleSchema, Role.config(sequelize));
	User.init(userSchema, User.config(sequelize));
	Recovery.init(RecoveryPasswordsModel, Recovery.config(sequelize));

	// relations
	Role.associate(sequelize.models);
	User.associate(sequelize.models);
}

module.exports = setupModels;
