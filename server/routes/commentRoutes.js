const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const { protect, restrictTo } = require("../middleware/authMiddleware");

// جلب الكومنتات متاح للجميع
router.get("/:articleId/comments", commentController.getCommentsByArticle);

// إضافة كومنت (لازم يكون مسجل دخول)
router.post("/:articleId/comments", protect, commentController.addComment);

// إضافة رد على كومنت معين (لازم يكون مسجل دخول)
router.post("/comments/:commentId/replies", protect, commentController.addReply);

// حذف كومنت (متاح لصاحب الكومنت أو الأدمن)
router.delete("/comments/:commentId", protect, async (req, res, next) => {
  try {
    const Comment = require("../models/Comment");
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.writer.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to delete this comment" });
    }

    await comment.deleteOne();
    res.json({ status: "success", message: "Comment deleted successfully" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;