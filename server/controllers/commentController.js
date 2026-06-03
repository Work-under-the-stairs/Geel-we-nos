const Comment = require("../models/Comment");


exports.getCommentsByArticle = async (req, res, next) => {
  try {
    const comments = await Comment.find({ newsId: req.params.articleId })
      .populate("writer", "name avatar")
      .populate("replies.writer", "name avatar")
      .sort({ createdAt: -1 });

    const processedComments = comments.map(comment => {
      const commentObj = comment.toObject(); 
      
      if (commentObj.replies && commentObj.replies.length > 0) {
        commentObj.replies.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }
      
      return commentObj;
    });

    res.status(200).json({ status: "success", data: processedComments });
  } catch (err) {
    next(err);
  }
};

exports.addComment = async (req, res, next) => {
  try {
    const { content } = req.body; 
    const { articleId } = req.params;

    const newComment = await Comment.create({
      newsId: articleId, 
      writer: req.user._id,
      content: content     
    });

    await newComment.populate("writer", "name avatar");

    res.status(201).json({ status: "success", data: newComment });
  } catch (err) {
    next(err);
  }
};


exports.addReply = async (req, res, next) => {
  try {
    const { content } = req.body;
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const reply = {
      content,
      writer: req.user._id, 
      createdAt: new Date(),
    };

    comment.replies.push(reply);
    await comment.save();

    await comment.populate("replies.writer", "name avatar");

    res.status(201).json({ status: "success", data: comment });
  } catch (err) {
    next(err);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.writer.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to delete this comment" });
    }

    await comment.deleteOne();
    res.json({ status: "success", message: "Comment deleted successfully" });
  } catch (err) {
    next(err);
  }
};