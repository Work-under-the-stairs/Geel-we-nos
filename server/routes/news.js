const express = require("express");
const router = express.Router();
const News = require("../models/News");

// GET /api/news
router.get("/", async (req, res) => {
  try {
    const { category, search, page = 1, limit = 10, sort = "-date" } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (search) filter.$text = { $search: search };

    const news = await News.find(filter)
      .populate("writer", "username name avatar")
      .populate("category", "name")
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await News.countDocuments(filter);
    res.json({ total, page: Number(page), limit: Number(limit), news });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/news/:id
router.get("/:id", async (req, res) => {
  try {
    const article = await News.findById(req.params.id)
      .populate("writer", "username name avatar")
      .populate("category", "name")
      .populate("comments.writer", "username name avatar")
      .populate("comments.replies.writer", "username name avatar");

    if (!article) return res.status(404).json({ message: "News not found" });
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/news
router.post("/add", async (req, res) => {
  try {
    const { title, content, writer, images, videos, category, important_rate } = req.body;
    const article = await News.create({ title, content, writer, images, videos, category, important_rate });
    res.status(201).json(article);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH /api/news/:id
router.patch("/:id", async (req, res) => {
  try {
    const article = await News.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "News not found" });

    const allowed = ["title", "content", "images", "videos", "category", "important_rate"];
    allowed.forEach((field) => {
      if (req.body[field] !== undefined) article[field] = req.body[field];
    });

    await article.save();
    res.json(article);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/news/:id
router.delete("/:id", async (req, res) => {
  try {
    const article = await News.findByIdAndDelete(req.params.id);
    if (!article) return res.status(404).json({ message: "News not found" });
    res.json({ message: "Article deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/news/:id/comments
router.post("/:id/comments", async (req, res) => {
  try {
    const article = await News.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "News not found" });

    const { content, writer } = req.body;
    article.comments.push({ content, writer });
    await article.save();
    res.status(201).json(article.comments[article.comments.length - 1]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/news/:id/comments/:commentId
router.delete("/:id/comments/:commentId", async (req, res) => {
  try {
    const article = await News.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "News not found" });

    const comment = article.comments.id(req.params.commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    comment.deleteOne();
    await article.save();
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/news/:id/comments/:commentId/replies
router.post("/:id/comments/:commentId/replies", async (req, res) => {
  try {
    const article = await News.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "News not found" });

    const comment = article.comments.id(req.params.commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    const { content, writer } = req.body;
    comment.replies.push({ content, writer });
    await article.save();
    res.status(201).json(comment.replies[comment.replies.length - 1]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/news/:id/comments/:commentId/replies/:replyId
router.delete("/:id/comments/:commentId/replies/:replyId", async (req, res) => {
  try {
    const article = await News.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "News not found" });

    const comment = article.comments.id(req.params.commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    const reply = comment.replies.id(req.params.replyId);
    if (!reply) return res.status(404).json({ message: "Reply not found" });

    reply.deleteOne();
    await article.save();
    res.json({ message: "Reply deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;