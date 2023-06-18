const { Model, DataTypes } = require('sequelize');

const ROLE_TABLE = 'roles';

const roleSchema = {
    id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    name: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING,
    },
};


class Role extends Model {
    static associate(models) {
        this.hasMany(models.User, {
            as: 'Users',
            foreignKey: 'roleId'
        })
    };

    static config(sequelize){
        return {
            sequelize,
            modelName: 'Role',
            tableName: ROLE_TABLE,
            timestamps: false
        };
    };
};

module.exports = {
    ROLE_TABLE,
    roleSchema,
    Role
}
