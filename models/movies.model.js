const { DataTypes } = require('sequelize');

const { sequelize } = require('../util/dataBase');

const Movies = sequelize.define('movie', {
    id: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    imgUrl: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: 'active'
    }
});

module.exports = {
    Movies
};
