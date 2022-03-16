const {DataTypes} = require('sequelize')
const { sequelize } = require('../util/dataBase')

const Reviews = sequelize.define('review', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    comment: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    movieId: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
})

module.exports = {
    Reviews
}