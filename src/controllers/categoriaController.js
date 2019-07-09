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

categoriaController.save = async(req, res)=>{
    const body = req.body;
    body.editorialId = (body.categoriaId == "") ? null : parseInt(body.editorialId);
    body.estatusId = (typeof body.estatusId == 'string') ? parseInt(body.estatusId) : body.estatusId;
    body.eliminadoId = (typeof body.eliminadoId == 'string') ? parseInt(body.eliminadoId) : body.eliminadoId;
    const row = await categoria.save(null, [body.editorialId, body.nombre, body.descripcion, body.estatusId, body.eliminadoId, dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss"), req.user.administradorId, dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss"), req.user.administradorId]);
    if (row != null) {
        res.status(200).json({ status: 200, success: 'OK' });
    } else {
        res.status(500).json({ status: 500, error: 'Error en la  insercción' });
    }
};

categoriaController.findAll = async(req, res)=>{
    var cols = {
        categoriaId: categoria.getNameColumn('categoriaId'),
        nombre: categoria.getNameColumn('nombre'),
        descripcion: categoria.getNameColumn('descripcion')
    };
    const rows = await categoria.findAll(cols);
    if (typeof res != "undefined") {
        if (rows != null) {
            res.status(200).json({ status: 200, rows });
        } else {
            res.status(500).json({ status: 500, error: 'Error' });
        }

    } else {
        return row;
    }
};

module.exports = categoriaController;