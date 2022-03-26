const {Sequelize} = require('sequelize')
const dotenv = require('dotenv')

dotenv.config({path: './config.env'})

const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    port: 5432,
    dialect: 'postgres', 
    logging: false,
    dialectOptions:{
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
})

// LocalHost connection
// const sequelize = new Sequelize({
//     host: 'localhost',
//     username: 'postgres',
//     password: 'password',
//     database: 'Movies',
//     port: 5432,
//     dialect: 'postgres',
// });

module.exports = {
    sequelize
};