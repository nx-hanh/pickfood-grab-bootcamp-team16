// authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Define authentication routes
router.post('/login', authController.login);

router.post('/register', authController.register);

router.get('/getListUsers', authController.getListUsers);

router.get('/getToken', authController.getToken);

module.exports = router;
