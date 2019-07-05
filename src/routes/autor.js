const express =    require('express');
const router = express.Router();
const autorController = require('../controllers/autorController');
router.get('/', autorController.index);
router.post('/save',autorController.save );
router.get('/findAll', autorController.findAll);
router.get('/:id', autorController.findById);
module.exports = router;