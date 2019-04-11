const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const User = require("./users")
const Dog = require("./dogs")

class Shop extends Sequelize.Model { }
Shop.init({
    Content: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, { sequelize: sequelize })


User.hasMany(Shop)
Shop.belongsTo(User)
module.exports = Shop;

