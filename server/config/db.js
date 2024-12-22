const { Sequelize } = require('sequelize')
const fs = require("node:fs");
require('dotenv').config()

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
            ca: fs.readFileSync('./config/ca-certificate.pem').toString(),
        }
    }
})

const testConnection = async () => {
    try {
        await sequelize.authenticate()
        console.log('SQL connection is successfull');

    } catch (error) {
        console.log('Error occured while connecting SQL', error);
    }
}

module.exports = { sequelize, testConnection };