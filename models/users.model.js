const {DataTypes} = require('sequelize')
const { sequelize } = require('../util/dataBase')

const User = sequelize.define('user', {
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
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaulValue: 'active'
    },
    role: {
        type: DataTypes.STRING(40),
        allowNull: false,
    }
});

module.exports = {
    User
}