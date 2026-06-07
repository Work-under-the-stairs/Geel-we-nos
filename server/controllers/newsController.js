const News = require("../models/News");
const Comment = require("../models/Comment");
const Category = require("../models/Category");

exports.getFeatured = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 3;

    const featuredNews = await News.find({ status: { $ne: "draft" } }) 
      .sort({ important_rate: -1, createdAt: -1 })
      .limit(limit)
      .populate("writer", "name avatar")
      .populate("category", "name icon_name");

    res.status(200).json({ status: "success", data: featuredNews });
  } catch (error) {
    next(error);
  }
};

exports.getUrgent = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 5;

    const urgentNews = await News.find({ isUrgent: true, status: { $ne: "draft" } })
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate("writer", "name avatar")
      .populate("category", "name icon_name");

    res.status(200).json({ status: "success", data: urgentNews });
  } catch (error) {
    next(error);
  }
};

exports.getTrending = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 5;

    const trendingNews = await News.find({ status: { $ne: "draft" } })
      .sort({ views: -1, createdAt: -1 })
      .limit(limit)
      .select("title images views category createdAt")
      .populate("category", "name icon_name");

    res.status(200).json({ status: "success", data: trendingNews });
  } catch (error) {
    next(error);
  }
};

exports.getLatest = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 8;

    const latestNews = await News.find({ status: { $ne: "draft" } })
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate("writer", "name avatar")
      .populate("category", "name icon_name");

    res.status(200).json({ status: "success", data: latestNews });
  } catch (error) {
    next(error);
  }
};

exports.getGroupedByCategory = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 4;

    const groupedData = await News.aggregate([
      { $match: { status: { $ne: "draft" } } },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: "$category",
          news: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          news: { $slice: ["$news", limit] },
        },
      },
    ]);

    const populatedData = await Category.populate(groupedData, {
      path: "_id",
      select: "name icon_name",
    });

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

exports.getCategoryFeatured = async (req, res, next) => {
  try {
    const { categoryName } = req.params;

    const category = await Category.findOne({ name: categoryName });
    if (!category) return res.status(404).json({ message: "Category not found" });

    const featured = await News.findOne({ category: category._id, status: { $ne: "draft" } }) 
      .sort({ important_rate: -1, createdAt: -1 })
      .populate("writer", "name avatar")
      .populate("category", "name icon_name");

    res.status(200).json({ status: "success", data: featured });
  } catch (error) {
    next(error);
  }
};

exports.getCategoryNews = async (req, res, next) => {
  try {
    const { categoryName } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const category = await Category.findOne({
      $or: [
        { name: categoryName },
        { _id: require('mongoose').Types.ObjectId.isValid(categoryName) ? categoryName : null }
      ].filter(Boolean)
    });

    if (!category) return res.status(404).json({ message: "Category not found" });

    const totalArticles = await News.countDocuments({ category: category._id, status: { $ne: "draft" } });
    const totalPages = Math.ceil(totalArticles / limit);

    const news = await News.find({ category: category._id, status: { $ne: "draft" } }) 
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("writer", "name avatar")
      .populate("category", "name icon_name");

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

exports.getCategoryTrending = async (req, res, next) => {
  try {
    const { categoryName } = req.params;
    const limit = parseInt(req.query.limit) || 5;

    const category = await Category.findOne({ name: categoryName });
    if (!category) return res.status(404).json({ message: "Category not found" });

    const trending = await News.find({ category: category._id, status: { $ne: "draft" } }) 
      .sort({ views: -1 })
      .limit(limit)
      .select("title images views createdAt");

    res.status(200).json({ status: "success", data: trending });
  } catch (error) {
    next(error);
  }
};


exports.getArticleById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const article = await News.findOne({ _id: id })
      .populate("writer", "name avatar biography")
      .populate("category", "name icon_name");

    if (!article) return res.status(404).json({ message: "Article not found or is still a draft" });

    res.status(200).json({ status: "success", data: article });
  } catch (error) {
    next(error);
  }
};

exports.trackView = async (req, res, next) => {
  try {
    const { id } = req.params;

    await News.findOneAndUpdate(
      { _id: id, status: { $ne: "draft" } }, 
      { $inc: { views: 1 } }
    );

    res.status(200).json({ status: "success", message: "View tracked successfully (if published)" });
  } catch (error) {
    next(error);
  }
};


exports.createNews = async (req, res, next) => {
  try {
    let imageUrls = [];

    if (req.body.images) {
      try {
        const parsedImages = Array.isArray(req.body.images)
          ? req.body.images
          : JSON.parse(req.body.images);

        imageUrls = parsedImages.map((img) => {
          if (typeof img === "string") {
            return { url: img, fileId: "", caption: "" };
          }
          return {
            url: img.url,
            fileId: img.fileId || "",
            caption: img.caption || ""
          };
        });
      } catch {
        imageUrls = [{ url: req.body.images, fileId: "", caption: "" }];
      }
    }

    if (req.files?.images) {
      for (const file of req.files.images) {
        const result = await uploadFile(file.buffer, "news/images", "image");
        imageUrls.push({
          url: result.secure_url,
          fileId: result.fileId || "",
          caption: ""
        });
      }
    }

    let videoUrls = req.body.videos ? (Array.isArray(req.body.videos) ? req.body.videos : [req.body.videos]) : [];
    let youtubeVideos = req.body.youtube_videos ? (Array.isArray(req.body.youtube_videos) ? req.body.youtube_videos : JSON.parse(req.body.youtube_videos)) : [];
    let hashtags = req.body.hashtags ? (Array.isArray(req.body.hashtags) ? req.body.hashtags : JSON.parse(req.body.hashtags)) : [];
    let contributors = req.body.contributors ? (Array.isArray(req.body.contributors) ? req.body.contributors : JSON.parse(req.body.contributors)) : [];

    const article = await News.create({
      title: req.body.title,
      content: req.body.content,
      writer: req.user._id,
      category: req.body.category,
      crossMediaId: (() => {
  const parsed = Number(req.body.crossMediaId);
  return req.body.crossMediaId && !isNaN(parsed) ? parsed : null;
})(),
      important_rate: req.body.important_rate,
      isUrgent: req.body.isUrgent || false,
      images: imageUrls,
      videos: videoUrls,
      youtube_videos: youtubeVideos,
      hashtags,
      contributors,
      main_image_comment: req.body.main_image_comment || "",
      status: req.body.status || "draft",
    });

    res.status(201).json({ status: "success", data: article });
  } catch (err) {
    next(err);
  }
};

exports.updateNews = async (req, res, next) => {
  try {
    const article = await News.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ status: "fail", message: "News not found" });
    }

    if (req.user.role === "writer" && article.writer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ status: "fail", message: "You are not authorized" });
    }

    const allowed = ["title", "content", "images", "main_image_comment", "videos", "youtube_videos", "category", "crossMediaId", "important_rate", "isUrgent", "hashtags", "contributors", "status"];
    const jsonFields = ["hashtags", "contributors", "youtube_videos", "images", "videos"];

    jsonFields.forEach((field) => {
      if (req.body[field] && typeof req.body[field] === "string") {
        try {
          req.body[field] = JSON.parse(req.body[field]);
        } catch (e) {
          if (["hashtags", "contributors", "youtube_videos"].includes(field)) {
            req.body[field] = req.body[field].split(",").map((item) => item.trim()).filter(Boolean);
          }
        }
      }
    });

    if (req.body.crossMediaId !== undefined) {
      req.body.crossMediaId = req.body.crossMediaId === "" ? null : Number(req.body.crossMediaId);
    }

    allowed.forEach((field) => {
      if (req.body[field] !== undefined) {
        article[field] = req.body[field];
      }
    });

    await article.save();

    res.status(200).json({ status: "success", message: "Article updated successfully", data: article });
  } catch (err) {
    next(err);
  }
};


exports.deleteNews = async (req, res, next) => {
  try {
    const article = await News.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "News not found" });

    if (req.user.role === "writer" && article.writer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not authorized" });
    }

    const imagekit = require('../utils/imagekit'); 

    if (article.images && article.images.length > 0) {
      await Promise.all(
        article.images.map(async (img) => {
          if (img.fileId) {
            try {
              await imagekit.deleteFile(img.fileId); 
              console.log(`Successfully deleted file: ${img.fileId}`);
            } catch (imgErr) {
              console.error(`Failed to delete file ${img.fileId}:`, imgErr.message);
            }
          }
        })
      );
    }

    await article.deleteOne();
    res.json({ status: "success", message: "Article and its images deleted successfully" });
  } catch (err) {
    next(err);
  }
};


exports.getAllNews = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {};

    if (req.query.category) filter.category = req.query.category;

    if (req.query.status) {
      if (req.query.status === "published") {
        filter.status = { $ne: "draft" };
      } else {
        filter.status = req.query.status;
      }
    }

    if (req.query.search) {
      filter.$or = [
        { title: { $regex: req.query.search, $options: "i" } },
        { content: { $regex: req.query.search, $options: "i" } }
      ];
    }

    let sortQuery = { createdAt: -1 };
    if (req.query.sort === "-views") {
      sortQuery = { views: -1, createdAt: -1 };
    } else if (req.query.sort === "-createdAt") {
      sortQuery = { createdAt: -1 };
    }

    const totalArticles = await News.countDocuments(filter);
    const totalPages = Math.ceil(totalArticles / limit);

    const news = await News.find(filter)
      .sort(sortQuery)
      .skip(skip)
      .limit(limit)
      .populate("writer", "name avatar")
      .populate("category", "name icon_name")
      .lean();

    res.status(200).json({
      status: "success",
      page,
      limit,
      totalPages,
      totalArticles,
      data: news,
    });
  } catch (error) {
    next(error);
  }
};

exports.searchNews = async (req, res, next) => {
  try {
    const { q } = req.query;
    console.log("🔍 Search hit! q =", q);

    if (!q || q.trim() === "") {
      return res.status(400).json({ message: "Search query is required" });
    }

    const results = await News.find({
      status: { $ne: "draft" },
      $or: [
        { title: { $regex: q.trim(), $options: "i" } },
        { content: { $regex: q.trim(), $options: "i" } },
        { hashtags: { $regex: q.trim(), $options: "i" } },
      ]
    })
      .sort({ important_rate: -1, createdAt: -1 })
      .limit(30)
      .populate("writer", "name avatar")
      .populate("category", "name icon_name");

    console.log("Results count:", results.length);
    res.status(200).json(results);
  } catch (error) {
    console.error("Search error:", error.message);
    next(error);
  }
};