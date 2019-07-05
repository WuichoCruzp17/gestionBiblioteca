const autor = require('../models/autor');
const catalogoParametroController = require('../controllers/catalogoParametroController');
const dateFormat = require('dateformat');
const autorController = {};

autorController.index = async(req, res)=>{
    var catalagoParametroAI = await catalogoParametroController.findByProperty('catalogoId',1);
    var catalagoParametroENE = await catalogoParametroController.findByProperty('catalogoId',2);
    var catalagoParametroMenu = await catalogoParametroController.findByProperty('catalogoId',3);
    catalagoParametroAI = (catalagoParametroAI !== null) ? catalagoParametroAI:[];
    catalagoParametroENE = (catalagoParametroENE != null) ? catalagoParametroENE:[];
    catalagoParametroMenu = (catalagoParametroMenu != null) ? catalagoParametroMenu:[];
    res.render('biblioteca/autor',{activoInactivo:catalagoParametroAI, eliminadoList:catalagoParametroENE,catalagoParametroMenu});
};

autorController.save = async(req, res)=>{
    const body = req.body;
    body.autorId = (body.autorId =="") ? null:parseInt(body.autorId);
    body.estatusId = (typeof body.estatusId =='string') ? parseInt(body.estatusId) :body.parseInt;
    body.eliminadoId = (typeof body.eliminadoId =='string')? parseInt(body.eliminadoId):body.eliminadoId;
    const row = await autor.save(null,[body.autorId, body.nombre,body.estatusId,body.eliminadoId,dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss"), req.user.administradorId,dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss"),req.user.administradorId]);
    if(row != null){
        res.status(200).json({ status:200,success: 'OK' });
    }else{
        res.status(500).json({ status:500, error: 'Error en la  insercción' });
    }
};

autorController.findById = async(req, res)=>{
    var object = null;
    if(typeof res !=="undefined"){
        console.log("Parametros: ", req.params.id);
          object = await autor.findById(req.params.id);
          if(object !== null){
              res.status(200).json({status:200, object});
          }else{
              res.status(500).json({status:500,object});
          }
    }else{
      object = await autor.findById(req);
      return object;
    }
};

autorController.findAll = async(req, res)=>{
    var cols ={
        autorId:autor.getNameColumn('autorId'),
        nombre:autor.getNameColumn('nombre')
    };
    const rows = await autor.findAll(cols);
    if(typeof res !="undefined"){
        if(rows != null){
            res.status(200).json({status:200,rows});
        }else{
            res.status(500).json({status:500, error:'Error al cargar al cargar'});
        }
        
    }else{
        return row;
    }
};
module.exports = autorController;