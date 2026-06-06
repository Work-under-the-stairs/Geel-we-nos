const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");

const { protect, restrictTo } = require("../middleware/authMiddleware"); 
const upload = require("../middleware/upload");
 
router.get("/featured", newsController.getFeatured);
router.get("/trending", newsController.getTrending);
router.get("/latest", newsController.getLatest);
router.get("/grouped-by-category", newsController.getGroupedByCategory);
router.get("/urgent", newsController.getUrgent);

router.post("/add", protect, restrictTo("admin"), 
upload.fields([{ name: "images", maxCount: 10 },{ name: "videos", maxCount: 5 },]), 
newsController.createNews);

router.get("/category/:categoryName/featured", newsController.getCategoryFeatured);
router.get("/category/:categoryName/trending", newsController.getCategoryTrending);
router.get("/category/:categoryName", newsController.getCategoryNews);

router.get("/", protect, restrictTo("admin"), newsController.getAllNews);
router.get("/:id", newsController.getArticleById);
router.post("/:id/view", newsController.trackView); 

 

router.patch("/:id", protect, restrictTo("admin"), newsController.updateNews);

router.delete("/:id", protect, restrictTo("admin"), newsController.deleteNews);
router.get('/search', newsController.searchNews);
module.exports = router;

 
 
 