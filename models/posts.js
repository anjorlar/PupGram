const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const User = require("./users");

class Post extends Sequelize.Model { }
Post.init({
    Title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Content: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, { sequelize: sequelize })

User.hasMany(Post);
Post.belongsTo(User);



module.exports = Post;