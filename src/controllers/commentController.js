const Comment = require('../models/Comment');

exports.addComment = async (req, res, next) => {
  try {
    const { text } = req.body;
    const postId = req.params.postId;
    if (!text) return res.status(400).json({ error: 'Text is required' });

    const comment = await Comment.create({ post: postId, author: req.user._id, text });
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
};

exports.getCommentsForPost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const comments = await Comment.find({ post: postId }).sort({ createdAt: -1 }).populate('author', 'name');
    res.json(comments);
  } catch (err) {
    next(err);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const commentId = req.params.commentId;
    const comment = await Comment.findById(commentId).populate('post');
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    // Allow deletion by comment author or post owner
    const isAuthor = req.user && comment.author.toString() === req.user._id.toString();
    const isPostOwner = req.user && comment.post && comment.post.author && comment.post.author.toString() === req.user._id.toString();
    if (!isAuthor && !isPostOwner) return res.status(403).json({ error: 'Forbidden: cannot delete comment' });

    await comment.remove();
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
