const express =    require('express');
const router = express.Router();
const editorialController = require('../controllers/editorialController');
router.get('/', editorialController.index);
router.post('/save', editorialController.save);
router.post('/update', editorialController.update);
router.post('/delete', editorialController.delete);
router.get('/findAll', editorialController.findAll);
router.get('/:id', editorialController.findById);
module.exports = router;