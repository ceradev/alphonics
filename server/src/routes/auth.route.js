const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const authController = new AuthController();

// Route for user registration
router.post('/signup' ,authController.signup);

// Route for user login
router.post('/login' ,authController.login);

// Route for user logout
router.get('/logout', authController.logout);

// Route for password reset
router.post('/reset-password' ,authController.resetPassword);

module.exports = router;