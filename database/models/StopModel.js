const { DataTypes, Model } = require('sequelize');

const STOP_TABLE = 'stops';

const StopSchema = {
	id: {
		primaryKey: true,
		autoIncrement: true,
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	lat: {
		allowNull: false,
		unique: true,
		type: DataTypes.DECIMAL(9, 6),
	},
	long: {
		allowNull: false,
		unique: true,
		type: DataTypes.DECIMAL(9, 6),
	},
	stop_name: {
		allowNull: true,
		unique: true,
		type: DataTypes.STRING,
	},
};

class Stop extends Model {
	static config(sequelize) {
		return {
			sequelize,
			tableName: STOP_TABLE,
			modelName: 'Stop',
			timestamps: false,
		};
	}
}

module.exports = {
	STOP_TABLE,
	StopSchema,
	Stop,
};
