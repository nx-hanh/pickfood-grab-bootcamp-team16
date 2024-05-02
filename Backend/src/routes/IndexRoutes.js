// authRoutes.js
const express = require('express');
const indexController = require('../controllers/indexController');

const router = express.Router();

// Define authentication routes
router.get('/', indexController.register)
router.get('/login', indexController.login)

module.exports = router;
