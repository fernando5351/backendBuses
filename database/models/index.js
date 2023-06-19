const { Role, RoleSchema } = require('./RoleModel');
const { UserSchema, User } = require('./UserModel');

function setupModels(sequelize) {
	Role.init(RoleSchema, Role.config(sequelize))
  User.init(UserSchema, User.config(sequelize));

	//associations
	Role.associate(sequelize.models)
	User.associate(sequelize.models);
};

module.exports = setupModels;
