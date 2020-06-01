const express = require("express");

const PostController = require("../controllers/posts");

const checkAuth = require("../middleware/check-auth");

const extractFile = require("../middleware/file");

const router = express.Router();

//Create Posts
router.post(
  "/", checkAuth,
  extractFile,
  PostController.createPost
);

//Read all Posts
router.get("/", PostController.getPosts);

//Read specific Post
router.get("/:id", PostController.getPost);

//Update Post
router.put(
  "/:id", checkAuth,
  extractFile,
  PostController.updatePost
);

//Delete Post
router.delete("/:id", checkAuth, PostController.deletePost);

module.exports = router;
