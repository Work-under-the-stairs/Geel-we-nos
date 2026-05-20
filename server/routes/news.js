const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");

// استدعاء ميدل وير الحماية والرفع
const { protect, restrictTo } = require("../middleware/authMiddleware"); 
const upload = require("../middleware/upload");

// ============================================================
// 🌍 الروابط العامة (لا تحتاج تسجيل دخول)
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

// إضافة خبر جديد (تم إزالة التحقق من الصلاحيات والتوكن)
router.post(
  "/add",
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "videos", maxCount: 5 },
  ]),
  async (req, res, next) => {
    try {
      const News = require("../models/News");

      // 1. التقاط الروابط المباشرة المرسلة من الفرونت إند
      let imageUrls = req.body.images ? (Array.isArray(req.body.images) ? req.body.images : [req.body.images]) : [];
      let videoUrls = req.body.videos ? (Array.isArray(req.body.videos) ? req.body.videos : [req.body.videos]) : [];

      // 2. إذا تم إرسال ملفات بصيغة binary/form-data، يتم رفعها احتياطياً إلى كلاوديناري
      if (req.files?.images) {
        const { uploadFile } = require("../helpers/cloudinary_service");
        for (const file of req.files.images) {
          const result = await uploadFile(file.buffer, "news/images", "image");
          imageUrls.push(result.secure_url);
        }
      }

      if (req.files?.videos) {
        const { uploadFile } = require("../helpers/cloudinary_service");
        for (const file of req.files.videos) {
          const result = await uploadFile(file.buffer, "news/videos", "video");
          videoUrls.push(result.secure_url);
        }
      }

      // 3. معالجة الهاشتاجات بأمان لتجنب توقف السيرفر
      let hashtags = [];
      if (req.body.hashtags) {
        if (Array.isArray(req.body.hashtags)) {
          hashtags = req.body.hashtags;
        } else {
          try {
            hashtags = JSON.parse(req.body.hashtags);
          } catch (e) {
            // إذا فشل التحليل (مثلا نص عادي مفصول بفواصل)، يتم وضعه داخل مصفوفة أو تنظيفه
            hashtags = typeof req.body.hashtags === 'string' ? req.body.hashtags.split(',').map(h => h.trim()) : [];
          }
        }
      }

      // 4. إنشاء وحفظ وثيقة الخبر الجديدة
      const article = await News.create({
        title: req.body.title,
        content: req.body.content,
        // تم استبدال req.user._id بـ استقبال الـ ID من الفرونت إند مباشرة (اختياري)
        // writer: req.body.writer || null, 
        category: req.body.category,
        important_rate: req.body.important_rate,
        isUrgent: req.body.isUrgent || false,
        images: imageUrls,
        videos: videoUrls,
        hashtags: hashtags,
        status: req.body.status || "draft", 
      });

      res.status(201).json({ status: "success", data: article });
    } catch (err) {
      next(err);
    }
  }
);

// تعديل الخبر (متاح للأدمن، أو الكاتب صاحب الخبر نفسه)
router.patch("/:id", async (req, res, next) => {
  try {
    const News = require("../models/News");
    const article = await News.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "News not found" });

    // // تريكة حماية: لو كاتب بيعدل، نتأكد إنه صاحب الخبر، الأدمن يعدل أي حاجة
    // if (req.user.role === "writer" && article.writer.toString() !== req.user._id.toString()) {
    //   return res.status(403).json({ message: "You are not authorized to edit this article" });
    // }

    // القائمة البيضاء للحقول المسموح بتعديلها لتشمل الحقول المحدثة
    const allowed = [
      "title", 
      "content", 
      "images", 
      "videos", 
      "category", 
      "important_rate", 
      "isUrgent",
      "hashtags",
      "status"
    ];

    allowed.forEach((field) => {
      if (req.body[field] !== undefined) article[field] = req.body[field];
    });

    await article.save();
    res.json({ status: "success", data: article });
  } catch (err) {
    next(err);
  }
});

// حذف الخبر نهائياً
// router.delete("/:id", protect, restrictTo("writer", "admin"), async (req, res, next) => {
router.delete("/:id", async (req, res, next) => {
  try {
    const News = require("../models/News");
    const article = await News.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "News not found" });

    // if (req.user.role === "writer" && article.writer.toString() !== req.user._id.toString()) {
    //   return res.status(403).json({ message: "You are not authorized to delete this article" });
    // }

    await article.deleteOne();
    res.json({ status: "success", message: "Article deleted successfully" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;