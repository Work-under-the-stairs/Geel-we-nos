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
router.get("/urgent", newsController.getUrgent);

router.get("/category/:categoryName/featured", newsController.getCategoryFeatured);
router.get("/category/:categoryName", newsController.getCategoryNews);
router.get("/category/:categoryName/trending", newsController.getCategoryTrending);

router.get("/:id", newsController.getArticleById);
router.post("/:id/view", newsController.trackView); // تسجيل المشاهدات

// ============================================================
// 🔐 روابط الإدارة والمنشئين (Protected & Authorized)
// ============================================================

// 👇 ده السطر اللي ضفناه عشان يحل مشكلة الـ 404 للداشبورد
router.get("/", protect, restrictTo("admin"), newsController.getAllNews);

router.post("/add", protect, restrictTo("admin"), 
upload.fields([{ name: "images", maxCount: 10 },{ name: "videos", maxCount: 5 },]), 
newsController.createNews);

// 2. تعديل الخبر (للأدمن، أو الكاتب صاحب الخبر نفسه)
router.patch("/:id", protect, restrictTo("admin"), newsController.updateNews);

// 3. حذف الخبر نهائياً (للأدمن، أو الكاتب صاحب الخبر نفسه)
router.delete("/:id", protect, restrictTo("admin"), newsController.deleteNews);

module.exports = router;