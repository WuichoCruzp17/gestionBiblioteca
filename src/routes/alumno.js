const express = require('express');
const router = express.Router();
const alumnoController = require('../controllers/alumnoController');
router.get('/', alumnoController.index);
router.post('/save', alumnoController.save);
router.post('/findByCriteria', alumnoController.findByCriteria);
router.post('/:matricula', alumnoController.validateMatricula);
router.post('/findById/:id', alumnoController.findById);
module.exports = router;