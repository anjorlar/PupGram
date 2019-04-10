const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const User = require("./users")
const Post = require("./posts")

class Comment extends Sequelize.Model { }
Comment.init({
    Text: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, { sequelize: sequelize })

User.hasMany(Comment);
Comment.belongsTo(User);
Post.hasMany(Comment);
Comment.belongsTo(Post);

module.exports = Comment;