const { sequelize } = require("../util/dataBase");
const {DataTypes} = require('sequelize')


const Actors = sequelize.define('actor', {
    id:{
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
    },
    name:{
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    oscarPriezes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    profilePic: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: 'active'
    }
})

module.exports = {
    Actors
}