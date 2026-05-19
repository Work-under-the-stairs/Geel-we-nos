const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");

// استدعاء ميدل وير الحماية (تأكدي من مطابقة المسميات عندك)
const { protect, restrictTo } = require("../middleware/authMiddleware"); 
const upload = require("../middleware/upload");

// ============================================================
// 公公开 الروابط العامة (لا تحتاج تسجيل دخول)
// ============================================================

router.get("/featured", newsController.getFeatured);
router.get("/trending", newsController.getTrending);
router.get("/latest", newsController.getLatest);
router.get("/grouped-by-category", newsController.getGroupedByCategory);

router.get("/category/:categoryName/featured", newsController.getCategoryFeatured);
router.get("/category/:categoryName", newsController.getCategoryNews);
router.get("/category/:categoryName/trending", newsController.getCategoryTrending);

router.get("/:id", newsController.getArticleById);
router.post("/:id/view", newsController.trackView); // تسجيل المشاهدات

// ============================================================
// 🔐 روابط الإدارة والمنشئين (Protected & Authorized)
// ============================================================

// إضافة خبر جديد (متاح للكاتب والأدمن)
router.post(
  "/add",
  protect,
  restrictTo("writer", "admin"),
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "videos", maxCount: 5 },
  ]),
  async (req, res, next) => {
    try {
      // الـ Logic بتاع الرفع الخاص بيكِ على كلوديناري هيفضل هنا أو ننقله للكنترولر
      const { uploadFile } = require("../helpers/cloudinary_service");
      const News = require("../models/News");

      let imageUrls = [];
      let videoUrls = [];

      if (req.files?.images) {
        for (const file of req.files.images) {
          const result = await uploadFile(file.buffer, "news/images", "image");
          imageUrls.push(result.secure_url);
        }
      }

      if (req.files?.videos) {
        for (const file of req.files.videos) {
          const result = await uploadFile(file.buffer, "news/videos", "video");
          videoUrls.push(result.secure_url);
        }
      }

      const article = await News.create({
        title: req.body.title,
        content: req.body.content,
        writer: req.user._id, // ربط تلقائي بـ ID اليوزر اللي مسجل دخول بدال ما يتبعت ف الـ body
        category: req.body.category,
        important_rate: req.body.important_rate,
        isUrgent: req.body.isUrgent || false,
        images: imageUrls,
        videos: videoUrls,
      });

      res.status(201).json({ status: "success", data: article });
    } catch (err) {
      next(err);
    }
  }
);

// تعديل وحذف الخبر (متاح للأدمن، أو الكاتب صاحب الخبر نفسه)
router.patch("/:id", protect, restrictTo("writer", "admin"), async (req, res, next) => {
  try {
    const News = require("../models/News");
    const article = await News.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "News not found" });

    // تريكة حماية: لو كاتب بيعدل، نتأكد إنه صاحب الخبر، الأدمن يعدل أي حاجة
    if (req.user.role === "writer" && article.writer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to edit this article" });
    }

    const allowed = ["title", "content", "images", "videos", "category", "important_rate", "isUrgent"];
    allowed.forEach((field) => {
      if (req.body[field] !== undefined) article[field] = req.body[field];
    });

    await article.save();
    res.json({ status: "success", data: article });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", protect, restrictTo("writer", "admin"), async (req, res, next) => {
  try {
    const News = require("../models/News");
    const article = await News.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "News not found" });

    if (req.user.role === "writer" && article.writer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to delete this article" });
    }

    await article.deleteOne();
    res.json({ status: "success", message: "Article deleted successfully" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;