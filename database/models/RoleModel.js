const { DataTypes, Model } = require('sequelize');

const ROLE_TABLE = 'roles';

const RoleSchema = {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        allowNull: false,
				unique: true,
        type: DataTypes.STRING
    },
    status: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
}


class Role extends Model {
    static associate(models){
        this.hasMany(models.User, {
            as: 'Users',
            foreignKey: 'roleId'
        });
    }

    static config(sequelize){
        return {
            sequelize,
            tableName: ROLE_TABLE,
            modelName: 'Role',
            timestamps: false
        }
    }
}

module.exports = {
    ROLE_TABLE,
    RoleSchema,
    Role
}
