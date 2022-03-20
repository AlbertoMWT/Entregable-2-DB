const { sequelize } = require("../util/dataBase");
const {DataTypes} = require(sequelize)

const ActorsInMovie = sequelize.define('actorInMovie', {
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    actorId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    movieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})

module.exports = {
    ActorsInMovie
}