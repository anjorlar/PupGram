const Sequelize = require("sequelize");
const sequelize = require("../config/database");

class User extends Sequelize.Model { }
User.init({
    Name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Bio: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Location: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imageurl: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, { sequelize: sequelize })
module.exports = User;