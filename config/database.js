const Sequelize = require("sequelize");

const sequelize = new Sequelize("pupgram", "root", process.env.MYSQL_PASSWORD, {
    host: "localhost",
    dialect: "mysql"
})

module.exports = sequelize;