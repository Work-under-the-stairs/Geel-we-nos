const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    newsId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "News",
      required: [true, "Comment must belong to an article (newsId)"],
    },
    content: {
      type: String,
      required: [true, "Comment content is required"],
      trim: true,
      maxlength: [1000, "Comment cannot exceed 1000 characters"],
    },
    writer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
          ref: "User",
          required: true,
        },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

// Index سريع عشان لما نفتح صفحة الخبر نجيب الكومنتات بتاعته في أجزاء من الثانية
commentSchema.index({ newsId: 1, createdAt: -1 });

module.exports = mongoose.model("Comment", commentSchema);