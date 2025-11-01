const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { addComment, getCommentsForPost, deleteComment } = require('../controllers/commentController');
const { body } = require('express-validator');
const validate = require('../middleware/validate');

// POST /api/comments/:postId  -> add comment to post
router.post('/:postId', auth, [body('text').isLength({ min: 1 }).withMessage('Text is required')], validate, addComment);
router.get('/:postId', getCommentsForPost);

// DELETE /api/comments/commentId -> delete a comment (author or post owner)
router.delete('/comment/:commentId', auth, deleteComment);

module.exports = router;
