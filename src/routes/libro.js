const express = require('express');
const router = express.Router();
const libroController = require('../controllers/libroController');

router.get('/', libroController.index);
router.post('/save',libroController.save);
router.get('/findCriteria',libroController.findCriteria);
module.exports = router;