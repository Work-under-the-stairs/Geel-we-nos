const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const { protect, restrictTo } = require("../middleware/authMiddleware");

// GET /api/categories - جلب كل الأقسام للجميع
router.get("/", async (req, res, next) => {
  try {
    const categories = await Category.find().sort("name");
    res.json({ status: "success", data: categories });
  } catch (err) {
    next(err);
  }
});

// GET /api/categories/:id - جلب قسم بالـ ID مع الأخبار بتاعته (لوحة التحكم)
router.get("/:id", async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const category = await Category.findById(req.params.id).populate({
      path: "news",
      options: {
        sort: { createdAt: -1 },
        skip: (page - 1) * limit,
        limit: Number(limit),
      },
      populate: { path: "writer", select: "name avatar" },
    });

    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json({ status: "success", data: category });
  } catch (err) {
    next(err);
  }
});

// POST /api/categories - إضافة قسم جديد (أدمن فقط)
router.post("/", protect, restrictTo("admin"), async (req, res, next) => {
  try {
    const { name, icon_name } = req.body;
    const category = await Category.create({ name, icon_name });
    res.status(201).json({ status: "success", data: category });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/categories/:id - تعديل قسم (أدمن فقط)
router.patch("/:id", protect, restrictTo("admin"), async (req, res, next) => {
  try {
    const { name, icon_name } = req.body;
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, icon_name },
      { new: true, runValidators: true }
    );
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json({ status: "success", data: category });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/categories/:id - حذف قسم (أدمن فقط)
router.delete("/:id", protect, restrictTo("admin"), async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json({ status: "success", message: "Category deleted successfully" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;