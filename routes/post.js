const express = require("express");
const router = express.Router();

const postController = require("../controller/postController");
router.get("/", postController.getFeeds);
router.get("/:id", postController.getPost);
router.post("/addPost", postController.postAddPost);
router.put("/:id/updatePost", postController.putUpdatePost);

module.exports = router;
