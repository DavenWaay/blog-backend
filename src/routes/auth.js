const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { register, login } = require('../controllers/authController');

router.post(
	'/register',
	[
		body('name').isLength({ min: 2 }).withMessage('Name is required'),
		body('email').isEmail().withMessage('Valid email is required'),
		body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
	],
	validate,
	register
);

router.post(
	'/login',
	[body('email').isEmail().withMessage('Valid email is required'), body('password').exists().withMessage('Password is required')],
	validate,
	login
);

module.exports = router;
