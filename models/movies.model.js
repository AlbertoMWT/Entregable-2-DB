const {DataTypes} = require('sequelize')

const { sequelize } = require("../util/dataBase");


const Movies = sequelize.define('movie', {
    id: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: falsem
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    imgUrl: {
        type: DataTypes.STRING(255),
        allowNull: false, 
    },
    genre: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(10),
        defaultValue: 'active',
        allowNull: false
    }
})

module.exports = {
    Movies
}