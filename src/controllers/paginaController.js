const pagina = require('../models/pagina');
const catalogoParametroController = require('../controllers/catalogoParametroController');
const paginaController ={};

paginaController.index = async (req, res)=>{
    var catalagoParametroAI = await catalogoParametroController.findByProperty('catalogoId',1);
    var catalagoParametroENE = await catalogoParametroController.findByProperty('catalogoId',2);
    var catalagoParametroMenu = await catalogoParametroController.findByProperty('catalogoId',3);
    catalagoParametroAI = (catalagoParametroAI !== null) ? catalagoParametroAI:[];
    catalagoParametroENE = (catalagoParametroENE != null) ? catalagoParametroENE:[];
    catalagoParametroMenu = (catalagoParametroMenu != null) ? catalagoParametroMenu:[];
    res.render('biblioteca/pagina',{activoInactivo:catalagoParametroAI, eliminadoList:catalagoParametroENE,catalagoParametroMenu});
};

paginaController.save = async (req, res)=>{
    const body = req.body;
    body.paginaId = (body.paginaId =="") ? null:parseInt(body.paginaId);
    body.seccionId =(typeof body.seccionId == 'string') ?parseInt(body.seccionId):body.seccionId;
    body.estatusId = (typeof body.estatusId =='string') ? parseInt(body.estatusId) :body.parseInt;
    body.eliminadoId = (typeof body.eliminadoId =='string')? parseInt(body.eliminadoId):body.eliminadoId;
    const row = await pagina.save(null,[body.paginaId,body.nombre, body.url,body.seccionId, body.estatusId, body.eliminadoId,null,req.user.administradorId,null,req.user.administradorId]);
    if(row != null){
        res.status(200).json({ success: 'OK' });
    }else{
        res.status(500).json({ error: 'Error en la  insercción' });
    }
};

module.exports = paginaController;