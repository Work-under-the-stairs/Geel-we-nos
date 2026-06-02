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
      required: [false, "Writer is required"],
    },
    images: [
      {
        url: { type: String, required: true, trim: true },
        fileId: { type: String, required: true, trim: true }, 
        caption: { type: String, trim: true, default: "" },
      },
    ],
    videos: [{ type: String, trim: true }],
    youtube_videos: [{ type: String, trim: true }],

    hashtags: [{ type: String, trim: true }],

    contributors: [
      {
        name: { type: String, trim: true, required: true },
        role: {
          type: String,
          enum: ["writer", "photographer", "editor"],
          default: "writer",
        },
      },
    ],

    status: {
      type: String,
      enum: {
        values: ["draft", "published"],
        message: "Status must be either 'draft' or 'published'",
      },
      default: "draft",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    crossMediaId: {
      type: Number,
      required: false,
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

newsSchema.index({ category: 1, createdAt: -1 });
newsSchema.index({ isUrgent: -1, createdAt: -1 });
newsSchema.index({ views: -1 });
newsSchema.index({ important_rate: -1, createdAt: -1 });
newsSchema.index({ title: "text", content: "text", hashtags: "text" });

module.exports = mongoose.model("News", newsSchema);