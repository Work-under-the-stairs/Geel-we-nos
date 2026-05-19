const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
    },
    writer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Writer is required"],
    },
    images: [{ type: String, trim: true }],
    videos: [{ type: String, trim: true }],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    important_rate: {
      type: Number,
      min: [1, "Importance rate must be at least 1"],
      max: [10, "Importance rate cannot exceed 10"],
      default: 5,
    },
    isUrgent: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// 🚀 تحسين الـ Indexes لأعلى أداء في الصفحة الرئيسية والأقسام
newsSchema.index({ category: 1, createdAt: -1 }); // لجلب أحدث أخبار قسم معين بسرعة
newsSchema.index({ isUrgent: -1, createdAt: -1 }); // لشريط عاجل (الأحدث أولاً)
newsSchema.index({ views: -1 }); // للأكثر قراءة (Trending)
newsSchema.index({ important_rate: -1, createdAt: -1 }); // للأخبار المميزة
newsSchema.index({ title: "text", content: "text" }); // محرك البحث الخاص بالموقع

module.exports = mongoose.model("News", newsSchema);