const express =    require('express');
const router = express.Router();
const administradorController = require('../controllers/administradorController');
router.get('/', administradorController.index);
router.post('/save', administradorController.save);
module.exports = router;