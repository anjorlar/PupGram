const express = require("express");
const postsController = require("../../controllers/posts");
const authenticate = require("../../middlewares/auth");
const router = express.Router();

router.get("/:id", postsController.getPostbyId);
router.get("/", postsController.getPost);
router.post("/", authenticate, postsController.postPost);
router.delete("/:id", authenticate, postsController.deletePost);
router.get("/user/:id", postsController.getPostByUser);

module.exports = router;
