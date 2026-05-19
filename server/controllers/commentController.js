const Comment = require("../models/Comment");

// ============================================================
// 💬 1. جلب تعليقات خبر معين (Get Comments)
// ============================================================
exports.getCommentsByArticle = async (req, res, next) => {
  try {
    const { articleId } = req.params;

    // بنجيب الكومنتات اللي تخص الـ newsId ده
    const comments = await Comment.find({ newsId: articleId })
      .populate("writer", "name avatar") // بيانات كاتب الكومنت الأساسي
      .populate("replies.writer", "name avatar") // تريكة ممتازة: بيانات كاتب الردود برضه!
      .sort({ createdAt: -1 }); // الأحدث أولاً من فوق

    res.status(200).json({ status: "success", count: comments.length, data: comments });
  } catch (error) {
    next(error);
  }
};

// ============================================================
// ✍️ 2. إضافة تعليق جديد (Add Comment)
// ============================================================
exports.addComment = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const { content } = req.body;
    
    // اليوزر هيكون جاي من الـ Auth Middleware (اليوزر اللي مسجل دخول)
    const writerId = req.user._id; 

    const newComment = await Comment.create({
      newsId: articleId,
      content,
      writer: writerId,
    });

    // عمل populate سريع للكومنت الجديد قبل ما نرجعه للفرونت إند علشان يعرضه فوراً
    await newComment.populate("writer", "name avatar");

    res.status(201).json({ status: "success", data: newComment });
  } catch (error) {
    next(error);
  }
};

// ============================================================
// ↪️ 3. إضافة رد على تعليق (Add Reply)
// ============================================================
exports.addReply = async (req, res, next) => {
  try {
    const { commentId } = req.params; // الـ ID بتاع الكومنت الأب
    const { content } = req.body;
    const writerId = req.user._id; // اليوزر اللي باعت الرد

    // بنعمل تحديث للكومنت الأب ونضيف الرد جوه مصفوفة الـ replies
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      {
        $push: {
          replies: {
            content,
            writer: writerId,
            createdAt: new Date(),
          },
        },
      },
      { new: true, runValidators: true } // يرجع الكومنت بعد التحديث ويشغل الـ Validation
    )
    .populate("writer", "name avatar")
    .populate("replies.writer", "name avatar");

    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(201).json({ status: "success", data: updatedComment });
  } catch (error) {
    next(error);
  }
};