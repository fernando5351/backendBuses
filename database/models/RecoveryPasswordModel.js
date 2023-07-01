const { DataTypes, Sequelize, Model } = require('sequelize');
const { USER_TABLE } = require('./UserModel');

const RECOVERY_PASSWORD_TABLE = 'recovery_passwords';

const RecoveryPasswordsModel = {
	id: {
		allowNull: false,
		primaryKey: true,
		type: DataTypes.INTEGER,
		autoIncrement: true,
	},
	userId: {
		field: 'user_id',
		allowNull: false,
		type: DataTypes.INTEGER,
		references: {
			model: USER_TABLE,
			key: 'id',
		},
		onDelete: 'NO ACTION',
		onUpdate: 'CASCADE',
	},
	oldPassword: {
		allowNull: false,
		type: DataTypes.STRING,
	},
	createAt: {
		allowNull: false,
		type: DataTypes.DATE,
		field: 'create_at',
		defaultValue: Sequelize.NOW,
	},
	status: {
		allowNull: false,
		type: DataTypes.BOOLEAN,
		defaultValue: true,
		field: 'status',
	},
};

class Recovery extends Model {
	static associate(models) {
		this.belongsTo(models.User, {
			as: 'User',
		});
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: RECOVERY_PASSWORD_TABLE,
			modelName: 'Recovery',
			timestamps: false,
		};
	}
}

module.exports = {
	RECOVERY_PASSWORD_TABLE,
	RecoveryPasswordsModel,
	Recovery,
};
