const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const { protect } = require("../middleware/authMiddleware");

router.get("/:articleId/comments", commentController.getCommentsByArticle);

router.post("/:articleId/comments", protect, commentController.addComment);

router.post("/:articleId/comments/:commentId/replies", protect, commentController.addReply);
router.delete("/:articleId/comments/:commentId", protect, commentController.deleteComment);

module.exports = router;