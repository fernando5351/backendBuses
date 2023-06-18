const { Sequelize, Model, DataTypes } = require('sequelize');
const { ROLE_TABLE } = require('./RoleModel');

const USER_TABLE = 'users';

const userSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING
    },
    roleId:{
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'role_id',
        unique: false,
        references: {
            model: ROLE_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION'
    },
    createAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
    }
}

class User extends Model {
    static associate(models) {
        this.belongsTo(models.Role, {
            as: 'Role'
        });
    };

    static config(sequelize){
        return{
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
            timestamps: false
        }
    };
}

module.exports = {
    USER_TABLE,
    userSchema,
    User
}
