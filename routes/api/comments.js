const express = require("express");
const CommentController = require("../../controllers/comments");
const authenticate = require("../../middlewares/auth");
const router = express.Router();

router.get("/:id", CommentController.getCommentbyId);
router.get("/", CommentController.getComments);
router.post("/", authenticate, CommentController.postComment);
router.delete("/:id", authenticate, CommentController.deleteComment);
router.get("/user/:id", CommentController.getCommentsByUser);

module.exports = router;

