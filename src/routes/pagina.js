const express =    require('express');
const router = express.Router();
const paginaController = require('../controllers/paginaController');
const {isLoggedIn,isNotLoogedin,validateAccesousUsuario} = require('../lib/auth');
router.get('/', paginaController.index);
router.post('/save',isLoggedIn,validateAccesousUsuario, paginaController.save);
module.exports = router;