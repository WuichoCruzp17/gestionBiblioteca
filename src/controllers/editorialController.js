const editorial = require('../models/editorial');
const dateFormat = require('dateformat');
const catalogoParametroController = require('../controllers/catalogoParametroController');
const editorialController = {};

editorialController.index = async (req, res) => {
    var catalagoParametroAI = await catalogoParametroController.findByProperty('catalogoId', 1);
    var catalagoParametroENE = await catalogoParametroController.findByProperty('catalogoId', 2);
    catalagoParametroAI = (catalagoParametroAI !== null) ? catalagoParametroAI : [];
    catalagoParametroENE = (catalagoParametroENE != null) ? catalagoParametroENE : [];
    res.render('biblioteca/editorial', { activoInactivo: catalagoParametroAI, eliminadoList: catalagoParametroENE });

};

editorialController.findById = async (req, res) => {
    var object = null;
    if (typeof res !== "undefined") {
        object = await editorial.findById(req.params.id);
        if (object !== null) {
            res.status(200).json({ status: 200, object });
        } else {
            res.status(500).json({ status: 500, object });
        }
    } else {
        object = await editorial.findById(req);
        return object;
    }
};

editorialController.save = async (req, res) => {
    const body = req.body;
    body.editorialId = (body.editorialId == "") ? null : parseInt(body.editorialId);
    body.estatusId = (typeof body.estatusId == 'string') ? parseInt(body.estatusId) : body.estatusId;
    body.eliminadoId = (typeof body.eliminadoId == 'string') ? parseInt(body.eliminadoId) : body.eliminadoId;
    const row = await editorial.save(null, [body.editorialId, body.nombre, body.direccion, body.telefono, body.estatusId, body.eliminadoId, dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss"), req.user.administradorId, dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss"), req.user.administradorId]);
    if (row != null) {
        res.status(200).json({ status: 200, success: 'OK' });
    } else {
        res.status(500).json({ status: 500, error: 'Error en la  insercción' });
    }
};

editorialController.update = async (req, res) => {
    const row = await editorial.update({
        columns: {
            nombre: { column: editorial.getNameColumn('nombre'), value: req.body.nombre },
            direccion: { column: editorial.getNameColumn('direccion'), value: req.body.direccion },
            telefono: { column: editorial.getNameColumn('telefono'), value: req.body.telefono },
            fechaModifico: { column: editorial.getNameColumn('fechaModifico'), value: dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss") },
            usuarioModifco: { column: editorial.getNameColumn('usuarioModifico'), value: req.user.administradorId }
        }
    }, { column: editorial.getNameColumn('editorialId'), value: req.body.editorialId });
    if (row != null) {
        res.status(200).json({ status: 200, success: 'OK' });
    } else {
        res.status(500).json({ status: 500, error: 'Error en el srvidor' });
    }
};

editorialController.delete = async (req, res) => {
    const row = await editorial.update({
        columns: {
            eliminadoId: { column: editorial.getNameColumn('eliminadoId'), value:4 },
            fechaModifico: { column: editorial.getNameColumn('fechaModifico'), value: dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss") }
        }
    },{column:editorial.getNameColumn('editorialId'), value:req.body.editorialId});
    if (row != null) {
        res.status(200).json({ status: 200, success: 'OK' });
    } else {
        res.status(500).json({ status: 500, error: 'Error en el srvidor' });
    }
};

editorialController.findAll = async (req, res) => {
    var cols = {
        editorialId: editorial.getNameColumn('editorialId'),
        nombre: editorial.getNameColumn('nombre')
    };
    const rows = await editorial.findAll(cols);
    if (typeof res != "undefined") {
        if (rows != null) {
            res.status(200).json({ status: 200, rows });
        } else {
            res.status(500).json({ status: 500, error: 'Error' });
        }

    } else {
        return rows;
    }
};

module.exports = editorialController;