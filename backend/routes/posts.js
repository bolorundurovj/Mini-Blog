const express = require("express");
const multer = require("multer");

const PostController = require("../controllers/posts");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLocaleLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});
//Create Posts
router.post(
  "/", checkAuth,
  multer({ storage: storage }).single("image"),
  PostController.createPost
);

//Read all Posts
router.get("/", PostController.getPosts);

//Read specific Post
router.get("/:id", PostController.getPost);

//Update Post
router.put(
  "/:id", checkAuth,
  multer({ storage: storage }).single("image"),
  PostController.updatePost
);

//Delete Post
router.delete("/:id", checkAuth, PostController.deletePost);

module.exports = router;
