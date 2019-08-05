const express =    require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const {isLoggedIn,isNotLoogedin,validateAccesousUsuario} = require('../lib/auth');
router.get('/', isLoggedIn,indexController.index);
router.get('/findArticle',indexController.findArticle);
module.exports = router;