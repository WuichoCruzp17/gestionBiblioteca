const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

router.get('/',categoriaController.index );
router.post('/save', categoriaController.save);
router.post('/delete',categoriaController.delete);
router.get('/findAll',categoriaController.findAll),
module.exports = router;