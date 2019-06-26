const pagina = require('../models/pagina');
const catalogoParametroController = require('../controllers/catalogoParametroController');
const paginaController ={};

paginaController.index = async (req, res)=>{
    var catalagoParametro = await catalogoParametroController.findByProperty('catalogoId',1);
    catalagoParametro = (catalagoParametro !== null) ? catalagoParametro:[];
    res.render('biblioteca/pagina',{catalagoParametro});
};

module.exports = paginaController;