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
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual populate — news field is derived, not stored
categorySchema.virtual("news", {
  ref: "News",
  localField: "_id",
  foreignField: "category",
});

module.exports = mongoose.model("Category", categorySchema);