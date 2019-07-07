const categoria = require('../models/categoria');
const catalogoParametroController = require('../controllers/catalogoParametroController');
const dateFormat = require('dateformat');
const categoriaController = {};

categoriaController.index = async(req, res)=>{
    var catalagoParametroAI = await catalogoParametroController.findByProperty('catalogoId',1);
    var catalagoParametroENE = await catalogoParametroController.findByProperty('catalogoId',2);
    var catalagoParametroMenu = await catalogoParametroController.findByProperty('catalogoId',3);
    catalagoParametroAI = (catalagoParametroAI !== null) ? catalagoParametroAI:[];
    catalagoParametroENE = (catalagoParametroENE != null) ? catalagoParametroENE:[];
    catalagoParametroMenu = (catalagoParametroMenu != null) ? catalagoParametroMenu:[];
    res.render('biblioteca/categoria',{activoInactivo:catalagoParametroAI, eliminadoList:catalagoParametroENE,catalagoParametroMenu});
};

module.exports = categoriaController;