// const bcrypt = require('bcryptjs');
// const jwt = require("jsonwebtoken");

const Post = require("../models/posts");
const User = require("../models/users");


exports.getPost = (req, res, next) => {
    Post.findAll({
        include: [
            {
                all: true,
                attributes: { exclude: ["password", "createdAt", "updatedAt"] }
            }
        ]
    })
        .then(posts => {
            res.json(posts);
        })
        .catch(err => res.json({ success: false }))
};

// Gets a Single post by its id

exports.getPostbyId = (req, res) => {
    const postId = req.params.id
    Post.findByPk(postId)
        .then(post => {
            if (!post) {
                res.status(404).json({ success: false, message: "Post not found" });
            } else {
                res.json(post)
            }
        })
        .catch(err =>
            res.status(500).json({
                success: false,
                message: "Something went wrong while getting the post"
            })
        );
};

// Send a Post

exports.postPost = (req, res) => {
    const { Title, Content } = req.body;
    const userId = req.userId;
    console.log("Req userId:" + userId);
    console.log("Header" + req.header("x-access-token"));
    User.findByPk(userId)
        .then(user => {
            user
                .createPost({
                    Title,
                    Content
                })
                .then(post => {
                    res.json(post);
                });
        })
        .catch(err =>
            res
                .status(500)
                .json({ msg: "Something went wrong while adding post", error: err })
        );
};

// Deletes a comment

exports.deletePost = (req, res) => {
    const postId = req.params.id;
    Post.findByPk(postId)
        .then(post => {
            if (post.userId !== req.userId) {
                res
                    .status(401)
                    .json({ msg: "You can't delete a post you did not send" });
            } else {
                post
                    .destroy()
                    .then(() => {
                        res.json({ success: true });
                    })
                    .catch(err => res.json({ success: false }));
            }
        })
        .catch(err =>
            res.json({ success: false, message: "This post doesn't exists" })
        );
};

/**
 * Gets all post created by the a user
 */
exports.getPostByUser = (req, res) => {
    const id = req.params.id;
    User.findByPk(id)
        .then(user => {
            user
                .getPost()
                .then(post => res.json(post))
                .catch(err =>
                    res.status(500).json({
                        success: false,
                        msg: "Something went wrong while getting post",
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



