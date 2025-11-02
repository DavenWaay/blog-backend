const Post = require('../models/Post');
const Comment = require('../models/Comment');

exports.createPost = async (req, res, next) => {
  try {
    const { title, body } = req.body;
    if (!title || !body) return res.status(400).json({ error: 'Title and body required' });

    const post = await Post.create({ title, body, author: req.user._id });
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

exports.getPosts = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page || '1', 10));
    const limit = Math.max(1, parseInt(req.query.limit || '10', 10));
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      Post.find().sort({ createdAt: -1 }).skip(skip).limit(limit).populate('author', 'name email'),
      Post.countDocuments(),
    ]);

    res.json({ data: posts, meta: { page, limit, total } });
  } catch (err) {
    next(err);
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name email');
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    // Only author can update
    if (!req.user || post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Forbidden: not the post author' });
    }

    const { title, body } = req.body;
    if (title) post.title = title;
    if (body) post.body = body;
    await post.save();
    res.json(post);
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    // Only author can delete
    if (!req.user || post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Forbidden: not the post author' });
    }

  // Delete associated comments first, then delete the post document.
  await Comment.deleteMany({ post: post._id });
  await Post.deleteOne({ _id: post._id });
  res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
