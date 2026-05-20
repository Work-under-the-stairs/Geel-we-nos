const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    newsId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "News", // ربط التعليق بالمقال
      required: [true, "Comment must belong to an article (newsId)"],
      index: true, // أضفنا index هنا لتسريع البحث عن تعليقات مقال محدد
    },
    content: {
      type: String,
      required: [true, "Comment content is required"],
      trim: true,
      maxlength: [1000, "Comment cannot exceed 1000 characters"],
    },
    writer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // ربط التعليق بالمستخدم
      required: [true, "Comment writer is required"],
    },
    replies: [
      {
        content: {
          type: String,
          required: true,
          trim: true,
          maxlength: [1000, "Reply cannot exceed 1000 characters"],
        },
        writer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // ربط الرد بالمستخدم
          required: true,
        },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

// Index مركب لجلب تعليقات المقال مرتبة من الأحدث للأقدم بسرعة عالية
commentSchema.index({ newsId: 1, createdAt: -1 });

module.exports = mongoose.model("Comment", commentSchema);