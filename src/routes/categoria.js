const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

router.get('/',categoriaController.index );
router.post('/save', categoriaController.save);
router.get('/findAll',categoriaController.findAll),
module.exports = router;