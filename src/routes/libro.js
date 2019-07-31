const express = require('express');
const router = express.Router();
const libroController = require('../controllers/libroController');

router.get('/', libroController.index);
router.get('/:id',libroController.findById);
router.post('/save',libroController.save);
router.post('/update', libroController.update);
router.post('/delete', libroController.delete);
router.post('/findCriteria',libroController.findCriteria);
module.exports = router;