const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');
const {isLoggedIn,isNotLoogedin,validateAccesousUsuario} = require('../lib/auth');
router.get('/',isLoggedIn, validateAccesousUsuario,categoriaController.index );
router.post('/save', isLoggedIn, validateAccesousUsuario,categoriaController.save);
router.post('/delete',isLoggedIn, validateAccesousUsuario,categoriaController.delete);
router.get('/findAll',isLoggedIn, validateAccesousUsuario,categoriaController.findAll),
module.exports = router;