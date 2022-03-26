const {DataTypes} = require('sequelize')
const { sequelize } = require('../util/dataBase')

const Users = sequelize.define('user', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: 'active'
    },
    role: {
        type: DataTypes.STRING(40),
        allowNull: false,
        defaultValue: 'guest'
    }
});

module.exports = {
    Users
}