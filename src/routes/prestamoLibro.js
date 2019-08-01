const express = require('express');
const router = express.Router();
const prestamoLibroController = require('../controllers/prestamoLibroController');
router.get('/', prestamoLibroController.index);
router.post('/validateStock', prestamoLibroController.validateStock);
router.post('/save', prestamoLibroController.save);
router.post('/findByCriteria', prestamoLibroController.findByCriteria);
module.exports = router;