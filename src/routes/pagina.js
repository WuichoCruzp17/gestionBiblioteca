const express =    require('express');
const router = express.Router();
const paginaController = require('../controllers/paginaController');

router.get('/', paginaController.index);

module.exports = router;