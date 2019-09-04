const express =    require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const {isLoggedIn,isNotLoogedin,validateAccesousUsuario} = require('../lib/auth');
router.get('/', loginController.login);
router.post('/validateSession', loginController.validateSession);
module.exports = router;