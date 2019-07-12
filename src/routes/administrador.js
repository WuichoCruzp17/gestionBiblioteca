const express =    require('express');
const router = express.Router();
const administradorController = require('../controllers/administradorController');
router.get('/', administradorController.index);
router.post('/save', administradorController.save);
router.post('/update', administradorController.update);
router.post('/delete', administradorController.delete);
router.get('/findAll', administradorController.findAll);
router.get('/:id', administradorController.findById);
module.exports = router;
