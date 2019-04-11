// const bcrypt = require('bcryptjs');
// const jwt = require("jsonwebtoken");

const Comments = require("../models/comments");
const User = require("../models/users");
const Post = require("../models/posts");

// Gets all Comment

exports.getComments = (req, res, next) => {
    Comments.findAll({
        include: [
            {
                all: true,
                attributes: { exclude: ["password", "createdAt", "updatedAt"] }
            }
        ]
    })
        .then(comments => {
            res.json(comments);
        })
        .catch(err => res.json({ success: false }))
};

// Gets a Single Comment by its id

exports.getCommentbyId = (req, res) => {
    const commentId = req.params.id
    Comments.findByPk(commentId)
        .then(comment => {
            if (!comment) {
                res.status(404).json({ success: false, message: "Comment not found" });
            } else {
                res.json(comment)
            }
        })
        .catch(err =>
            res.status(500).json({
                success: false,
                message: "Something went wrong while getting the comment"
            })
        );
};

// Posts a Comment

exports.postComment = (req, res) => {
    const { Text } = req.body;
    const userId = req.userId;
    // const postId = req.postId;
    console.log("Req userId:" + userId);
    console.log("Header" + req.header("x-access-token"));
    User.findByPk(userId)
        .then(user => {
            user
                .createComment({
                    Text
                })
                .then(comment => {
                    res.json(comment);
                });
        })
        .catch(err =>
            res
                .status(500)
                .json({ msg: "Something went wrong while adding comment", error: err })
        );
};

// Deletes a comment

exports.deleteComment = (req, res) => {
    const commentId = req.params.id;
    Comments.findByPk(commentId)
        .then(comment => {
            if (comment.userId !== req.userId) {
                res
                    .status(401)
                    .json({ msg: "You can't delete a comment you did not send" });
            } else {
                comment
                    .destroy()
                    .then(() => {
                        res.json({ success: true });
                    })
                    .catch(err => res.json({ success: false }));
            }
        })
        .catch(err =>
            res.json({ success: false, message: "This comment doesn't exists" })
        );
};

/**
 * Gets all comments created by the a user
 */
exports.getCommentsByUser = (req, res) => {
    const id = req.params.id;
    User.findByPk(id)
        .then(user => {
            user
                .getComments()
                .then(comments => res.json(comments))
                .catch(err =>
                    res.status(500).json({
                        success: false,
                        msg: "Something went wrong while getting comment",
                        error: err
                    })
                );
        })
        .catch(err =>
            res.status(500).json({
                success: false,
                msg: "Something went wrong while getting user",
                error: err
            })
        );
};

// Getting all comment by post

// NOTE >>> HASNOT BEEN EXPORTED TO ROUTE

// exports.getCommentsByPost= (req, res) => {
//     const id = req.params.id;
//     Post.findByPk(id)
//         .then(post => {
//             post
//                 .getComments()
//                 .then(comments => res.json(comments))
//                 .catch(err =>
//                     res.status(500).json({
//                         success: false,
//                         msg: "Something went wrong while getting comment",
//                         error: err
//                     })
//                 );
//         })
//         .catch(err =>
//             res.status(500).json({
//                 success: false,
//                 msg: "Something went wrong while getting post",
//                 error: err
//             })
//         );
// };


