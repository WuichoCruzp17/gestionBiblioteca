const administrador = require('../models/administrador');
const bdComponents  = require('../utilsModels/bdComponents');
const catalogoParametroController = require('../controllers/catalogoParametroController');
const perfilController = require('../controllers/perfilController');
const helpers = require('../lib/helpers');
const administradorController = {};
var cols = {
    administradorId: administrador.getNameColumn('administradorId'),
    perfilId:administrador.getNameColumn('perfilId'),
    concat: bdComponents.functions.CONCAT([administrador.getNameColumn('nombre'), administrador.getNameColumn('apellidoPaterno'), administrador.getNameColumn('apellidoMaterno')], "nombre"),
    email: administrador.getNameColumn('correo')
};

administradorController.index = async(req, res) =>{
    var catalagoParametroAI = await catalogoParametroController.findByProperty('catalogoId',1);
    var catalagoParametroENE = await catalogoParametroController.findByProperty('catalogoId',2);
    var perfilList = await  perfilController.findAll()
    catalagoParametroAI = (catalagoParametroAI !== null) ? catalagoParametroAI:[];
    catalagoParametroENE = (catalagoParametroENE != null) ? catalagoParametroENE:[];
    perfilList = (perfilList != null) ? perfilList :[];
    res.render('biblioteca/administrador',{perfilList,activoInactivo:catalagoParametroAI, eliminadoList:catalagoParametroENE});
};

administradorController.findById =async(req, res)=>{
    var object = null;
  if(typeof res !=="undefined"){
      console.log("Parametors: ",req.params)
        object = await administrador.findById(req.params.id);
        if(object !== null){
            res.status(200).json({status:200, object});
        }else{
            res.status(500).json({status:500,object});
        }
  }else{
      console.log("ENTRO");
    object = await administrador.findById(req);
    return object;
  }
};

administradorController.save = async(req, res)=>{
    const body = req.body;
    console.log(body);
    body.administradorId = (body.administradorId !=='') ? parseInt(body.administradorId) :null;
    body.contrasena = await helpers.encryptPassword(body.contrasena);
    const row = administrador.save(null,[body.administradorId,body.perfilId,body.nombre, body.apellidoPaterno, body.apellidoMaterno,body.correo,body.contrasena, body.estatusId,body.eliminadoId,null,req.user.administradorId,null,req.user.administradorId]);
    if(row != null){
        res.status(200).json({ status:200,success: 'OK' });
    }else{
        res.status(500).json({ status:500, error: 'Error en la  insercción' });
    }
}

administradorController.findAll = async(req, res)=>{
    var cols = {
        administradorId: administrador.getNameColumn('administradorId'),
        concat: bdComponents.functions.CONCAT([administrador.getNameColumn('nombre'), administrador.getNameColumn('apellidoPaterno'), administrador.getNameColumn('apellidoMaterno')], "nombre"),
        correo: administrador.getNameColumn('correo')
    };
    const rows =  await administrador.findAll(cols);
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

administradorController.findByProperty = async(property,value) =>{
    return await administrador.findByProperty(property,value, cols);
}

module.exports = administradorController;