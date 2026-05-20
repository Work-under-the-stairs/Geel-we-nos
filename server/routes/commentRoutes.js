const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const { protect } = require("../middleware/authMiddleware");

// جلب الكومنتات (متاح للجميع)
router.get("/:articleId/comments", commentController.getCommentsByArticle);

// إضافة كومنت (محمي)
router.post("/:articleId/comments", protect, commentController.addComment);

// إضافة رد على كومنت (محمي)
// تعديل المسار ليشمل الـ articleId كما يطلبه الفرونت إند
router.post("/:articleId/comments/:commentId/replies", protect, commentController.addReply);
// حذف كومنت (محمي - تم نقل منطق الحذف إلى الـ controller)
router.delete("/:articleId/comments/:commentId", protect, commentController.deleteComment);

module.exports = router;