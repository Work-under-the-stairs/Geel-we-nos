const mongoose = require("mongoose");
const commentSchema = require("./Comment");

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
    date: {
      type: Date,
      default: Date.now,
    },
    images: [
      {
        type: String,
        trim: true,
      },
    ],
    videos: [
      {
        type: String,
        trim: true,
      },
    ],
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
    comments: [commentSchema],
  },
  { timestamps: true }
);

// Index for faster queries
newsSchema.index({ category: 1, date: -1 });
newsSchema.index({ important_rate: -1 });
newsSchema.index({ title: "text", content: "text" });

module.exports = mongoose.model("News", newsSchema);