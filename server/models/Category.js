const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
      maxlength: [50, "Category name cannot exceed 50 characters"],
    },
    icon_name: {
      type: String,
      required: [true, "Category icon name is required"],
      trim: true,
      default: "Newspaper",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual populate
categorySchema.virtual("news", {
  ref: "News",
  localField: "_id",
  foreignField: "category",
});

module.exports = mongoose.model("Category", categorySchema);