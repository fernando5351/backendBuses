const { UserSchema, User } = require('./UserModel');

function setupModels(sequelize) {

    User.init(UserSchema, User.config(sequelize.models));

		//associations
		User.associate(sequelize.models);
};

module.exports = setupModels;
