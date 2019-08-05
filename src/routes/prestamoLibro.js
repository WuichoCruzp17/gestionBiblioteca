const express = require('express');
const router = express.Router();
const prestamoLibroController = require('../controllers/prestamoLibroController');
router.get('/', prestamoLibroController.index);
router.post('/validateStock', prestamoLibroController.validateStock);
router.post('/save', prestamoLibroController.save);
router.post('/findByCriteria', prestamoLibroController.findByCriteria);
router.get('/:id',prestamoLibroController.findById);
router.delete('/:id',prestamoLibroController.delete)
router.post('/update',prestamoLibroController.update);
module.exports = router;