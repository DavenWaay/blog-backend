const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { createPost, getPosts, getPostById, updatePost, deletePost } = require('../controllers/postController');

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', auth, [body('title').isLength({ min: 1 }).withMessage('Title is required'), body('body').isLength({ min: 1 }).withMessage('Body is required')], validate, createPost);
router.put('/:id', auth, [body('title').optional().isLength({ min: 1 }).withMessage('Title cannot be empty'), body('body').optional().isLength({ min: 1 }).withMessage('Body cannot be empty')], validate, updatePost);
router.delete('/:id', auth, deletePost);

module.exports = router;
