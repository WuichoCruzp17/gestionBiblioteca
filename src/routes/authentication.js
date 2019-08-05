const express = require('express');
const router = express.Router();
const authC = require('../controllers/authController');
router.get('/logout',authC.getLogout);
module.exports = router;