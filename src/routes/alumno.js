const express = require('express');
const router = express.Router();
const alumnoController = require('../controllers/alumnoController');
const {isLoggedIn,isNotLoogedin,validateAccesousUsuario} = require('../lib/auth');
router.get('/',isLoggedIn, validateAccesousUsuario, alumnoController.index);
router.post('/save',isLoggedIn, validateAccesousUsuario, alumnoController.save);
router.post('/update', isLoggedIn, validateAccesousUsuario,alumnoController.update);
router.post('/delete', isLoggedIn, validateAccesousUsuario,alumnoController.delete);
router.post('/findByCriteria', isLoggedIn, validateAccesousUsuario,alumnoController.findByCriteria);
router.post('/:matricula', isLoggedIn, validateAccesousUsuario,alumnoController.validateMatricula);
router.post('/findById/:id',isLoggedIn, validateAccesousUsuario, alumnoController.findById);
module.exports = router;