const News = require("../models/News");
const Comment = require("../models/Comment");
const Category = require("../models/Category");

// ============================================================
// 🏠 1. الروتس الخاصة بالصفحة الرئيسية (Home Page)
// ============================================================

// A. الأخبار المميزة (الكارد الكبيرة واللي تحتها) بناءً على الـ important_rate
exports.getFeatured = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 3;
    
    const featuredNews = await News.find()
      .sort({ important_rate: -1, createdAt: -1 }) // الأعلى أهمية ثم الأحدث
      .limit(limit)
      .populate("writer", "name avatar")
      .populate("category", "name icon_name");

    res.status(200).json({ status: "success", data: featuredNews });
  } catch (error) {
    next(error);
  }
};

// B. الأكثر قراءة (Trending) للموقع كله
exports.getTrending = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 5;

    const trendingNews = await News.find()
      .sort({ views: -1, createdAt: -1 }) // الأكثر مشاهدة
      .limit(limit)
      .select("title images views category createdAt") // سحب الحقول المطلوبة فقط للـ Sidebar
      .populate("category", "name icon_name");

    res.status(200).json({ status: "success", data: trendingNews });
  } catch (error) {
    next(error);
  }
};

// C. أحدث الأخبار في الموقع كله (Latest)
exports.getLatest = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 8;

    const latestNews = await News.find()
      .sort({ createdAt: -1 }) // الأحدث مطلقاً
      .limit(limit)
      .populate("writer", "name avatar")
      .populate("category", "name icon_name");

    res.status(200).json({ status: "success", data: latestNews });
  } catch (error) {
    next(error);
  }
};

// D. التريكة الكبيرة: أحدث X أخبار من كل قسم في Call واحد (Grouped By Category)
exports.getGroupedByCategory = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 4;

    // بنستخدم الـ Aggregate علشان نلف على الأقسام ونجيب أحدث أخبار جواها بـ Request واحد
    const groupedData = await News.aggregate([
      { $sort: { createdAt: -1 } }, // ترتيب الأخبار كلها من الأحدث للأقدم أولاً
      {
        $group: {
          _id: "$category", // التجميع بناءً على الـ category ID
          news: { $push: "$$ROOT" }, // ضخ الأخبار المرتبة جوه مصفوفة للقسم
        },
      },
      {
        $project: {
          news: { $slice: ["$news", limit] }, // أخذ أول X أخبار بس من المصفوفة بعد الترتيب
        },
      },
    ]);

    // Populate لبيانات الأقسام علشان نرجع اسم القسم بدل الـ ID بتاعه
    const populatedData = await Category.populate(groupedData, {
      path: "_id",
      select: "name icon_name",
    });

    // تحويل الـ Response لـ Format شيك ومريح جداً للفرونت إند: { "اسم القسم": [الأخبار] }
    const responseData = {};
    populatedData.forEach((item) => {
      if (item._id) {
        responseData[item._id.name] = {
          icon_name: item._id.icon_name,
          categoryId: item._id._id,
          articles: item.news,
        };
      }
    });

    res.status(200).json({ status: "success", data: responseData });
  } catch (error) {
    next(error);
  }
};

// ============================================================
// 🗂️ 2. الروتس الخاصة بصفحة القسم (Category Page)
// ============================================================

// A. أهم خبر في قسم معين (المميز داخل القسم)
exports.getCategoryFeatured = async (req, res, next) => {
  try {
    const { categoryName } = req.params;
    
    const category = await Category.findOne({ name: categoryName });
    if (!category) return res.status(404).json({ message: "Category not found" });

    const featured = await News.findOne({ category: category._id })
      .sort({ important_rate: -1, createdAt: -1 })
      .populate("writer", "name avatar")
        .populate("category", "name icon_name");

    res.status(200).json({ status: "success", data: featured });
  } catch (error) {
    next(error);
  }
};

// B. أخبار القسم مع الـ Pagination (عرض المزيد)
exports.getCategoryNews = async (req, res, next) => {
  try {
    const { categoryName } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6; // خلّي الافتراضي 6 متناسق مع الفرونت
    const skip = (page - 1) * limit;

    // بنقفل البحث بحيث يدعم لو مبعوت له اسم القسم "أو" الـ ID بتاعه للحماية التامة
    const category = await Category.findOne({
      $or: [
        { name: categoryName },
        { _id: require('mongoose').Types.ObjectId.isValid(categoryName) ? categoryName : null }
      ].filter(Boolean)
    });
    
    if (!category) return res.status(404).json({ message: "Category not found" });

    // 🌟 التريك الحاسم: حساب إجمالي المقالات في القسم ده عشان نطلع totalPages
    const totalArticles = await News.countDocuments({ category: category._id });
    const totalPages = Math.ceil(totalArticles / limit);

    const news = await News.find({ category: category._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("writer", "name avatar")
      .populate("category", "name icon_name");

    // 🌟 بنرجع الـ totalPages والـ totalArticles ع الجاهز للفرونت إند
    res.status(200).json({ 
      status: "success", 
      page, 
      limit, 
      totalPages, 
      totalArticles, 
      data: news 
    });
  } catch (error) {
    next(error);
  }
};

// C. الأكثر قراءة داخل قسم معين (للـ Sidebar الخاص بالقسم)
exports.getCategoryTrending = async (req, res, next) => {
  try {
    const { categoryName } = req.params;
    const limit = parseInt(req.query.limit) || 5;

    const category = await Category.findOne({ name: categoryName });
    if (!category) return res.status(404).json({ message: "Category not found" });

    const trending = await News.find({ category: category._id })
      .sort({ views: -1 })
      .limit(limit)
      .select("title images views createdAt");

    res.status(200).json({ status: "success", data: trending });
  } catch (error) {
    next(error);
  }
};

// ============================================================
// 📄 3. الروتس الخاصة بصفحة الخبر نفسه (Article Page)
// ============================================================

// A. جلب تفاصيل الخبر (بدون كومنتات - خفيف وسريع)
exports.getArticleById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const article = await News.findById(id)
      .populate("writer", "name avatar biography")
      .populate("category", "name icon_name");

    if (!article) return res.status(404).json({ message: "Article not found" });

    res.status(200).json({ status: "success", data: article });
  } catch (error) {
    next(error);
  }
};

// B. تسجيل مشاهدة (تشتغل بعد بقاء اليوزر 10 ثواني في الصفحة)
exports.trackView = async (req, res, next) => {
  try {
    const { id } = req.params;

    // زيادة الـ views بمقدار 1 بشكل آمن وسريع جداً بفضل الـ Index
    await News.findByIdAndUpdate(id, { $inc: { views: 1 } });

    res.status(200).json({ status: "success", message: "View tracked successfully" });
  } catch (error) {
    next(error);
  }
};