const libro = require('../models/libro');
const dateFormat = require('dateformat');
const editorialController = require('../controllers/editorialController');
const catalagoParametroController = require('../controllers/catalogoParametroController');
const categorioController = require('../controllers/categoriaController');
const {IDIOMA, ESTATUS, ESTATUS_ELIMANDO} = require('../resources/codeBss');
const libroController = {};

libroController.index = async(req, res)=>{
    var editorialList =await editorialController.findAll();
    editorialList = (editorialList !== null) ? editorialList:[];
    var idiomaList = await catalagoParametroController.findByProperty('catalogoId',IDIOMA);
    idiomaList = (idiomaList !== null) ? idiomaList:[];
    var categoriaLit = await categorioController.findAll();
    categoriaLit= (categoriaLit !== null) ? categoriaLit:[];
    var catalagoParametroAI = await catalagoParametroController.findByProperty('catalogoId',ESTATUS);
    var catalagoParametroENE = await catalagoParametroController.findByProperty('catalogoId',ESTATUS_ELIMANDO);
    catalagoParametroAI = (catalagoParametroAI !== null) ? catalagoParametroAI:[];
    catalagoParametroENE = (catalagoParametroENE != null) ? catalagoParametroENE:[];
    res.render('biblioteca/libro', {editorialList, idiomaList, categoriaLit,activoInactivo:catalagoParametroAI, eliminadoList:catalagoParametroENE});
};

module.exports = libroController;