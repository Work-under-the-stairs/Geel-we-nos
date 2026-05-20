const Comment = require("../models/Comment");

// 1. جلب كل الكومنتات الخاصة بمقال معين
exports.getCommentsByArticle = async (req, res, next) => {
  try {
    const comments = await Comment.find({ newsId: req.params.articleId })
      .populate("writer", "name avatar") // جلب اسم وصورة كاتب الكومنت
      .populate("replies.writer", "name avatar") // جلب اسم وصورة أصحاب الردود
      .sort({ createdAt: -1 });

    res.status(200).json({ status: "success", results: comments.length, data: comments });
  } catch (err) {
    next(err);
  }
};

// 2. إضافة كومنت جديد
exports.addComment = async (req, res, next) => {
  try {
    const { content } = req.body;
    const { articleId } = req.params;

    // نقوم بإنشاء الكومنت باستخدام الـ writer من الـ req.user (الذي جاء من الـ protect middleware)
    const newComment = await Comment.create({
      newsId: articleId,
      content,
      writer: req.user._id, 
    });

    // جلب بيانات الكاتب فوراً للرد بها على الفرونت إند
    await newComment.populate("writer", "name avatar");

    res.status(201).json({ status: "success", data: newComment });
  } catch (err) {
    next(err);
  }
};

// 3. إضافة رد (Reply) على كومنت
exports.addReply = async (req, res, next) => {
  try {
    const { content } = req.body;
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // إضافة الرد لمصفوفة الردود
    const reply = {
      content,
      writer: req.user._id, // المستخدم الحالي
      createdAt: new Date(),
    };

    comment.replies.push(reply);
    await comment.save();

    // جلب بيانات الرد المحدثة
    await comment.populate("replies.writer", "name avatar");

    res.status(201).json({ status: "success", data: comment });
  } catch (err) {
    next(err);
  }
};

// 4. حذف كومنت
exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    // التأكد من أن المستخدم هو صاحب الكومنت أو أدمن
    if (comment.writer.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to delete this comment" });
    }

    await comment.deleteOne();
    res.json({ status: "success", message: "Comment deleted successfully" });
  } catch (err) {
    next(err);
  }
};