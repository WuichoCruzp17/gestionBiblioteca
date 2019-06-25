const express =    require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
router.get('/', loginController.login);
router.post('/validateSession', loginController.validateSession);
module.exports = router;