const libro = require('../models/libro');
const dateFormat = require('dateformat');
const editorialController = require('../controllers/editorialController');
const catalagoParametroController = require('../controllers/catalogoParametroController');
const categorioController = require('../controllers/categoriaController');
const autorController = require('../controllers/autorController');
const {IDIOMA, ESTATUS, ESTATUS_ELIMANDO,ELIMINADO} = require('../resources/codeBss');
const libroAutorController = require('../controllers/libroAutorController');
const ISBN = require( 'isbn-validate' );
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
    var autorList = await autorController.findAll();
    autorList = (autorList != null) ? autorList:[];
    res.render('biblioteca/libro', {editorialList, idiomaList, categoriaLit,activoInactivo:catalagoParametroAI, eliminadoList:catalagoParametroENE,autorList});
};

libroController.findById  = async(req, res)=>{
    var object = null;
    var autores = [];
    if (typeof res !== "undefined") {
        object = await libro.findById(req.params.id);

        if (object !== null) {
            
            autores = await libroAutorController.findProperty('libroId',object.libroId);
            if(Array.isArray(autores)){
                object.autores = autores;
            }
            res.status(200).json({ status: 200, object });
        } else {
            res.status(200).json({ status: 500, object });
        }
    } else {
        object = await libro.findById(req);
        if(object != null){
            autores =await  libroAutorController.findProperty('libroId',object.libroId);
            if(autores != null){
                object.autores = autores[0];
            }
        }
        return object;
    }
};

libroController.save = async(req, res)=>{
    const body =req.body;
    if(ISBN.Validate(body.isbn)){
    for(var k in body){
        if(k.split('[]').length>1){
            var respaldo= body[k];
            delete body[k];
            body[k.split('[]')[0]] = respaldo;
        }
    }
    body.libroId = (body.libroId == "") ? null : parseInt(body.libroId);
    body.estatusId = (typeof body.estatusId == 'string') ? parseInt(body.estatusId) : body.estatusId;
    body.eliminadoId = (typeof body.eliminadoId == 'string') ? parseInt(body.eliminadoId) : body.eliminadoId;
    body.editorialId = (typeof body.editorialId == 'string') ? parseInt(body.editorialId) : body.editorialId;
    var row = await libro.save(null, 
        [
            body.libroId, 
            body.isbn, 
            body.titulo, 
            body.autoresText,
            body.editorialId,
            body.idiomaId, 
            body.categoriaId,
            body.cantidad, 
            body.estatusId, 
            body.eliminadoId, 
            dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss"), 
            req.user.administradorId,
             dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss"), 
            req.user.administradorId
        ]);
    if (row != null) {
        var administradorId = req.user.administradorId;
        const autores = [];
        for(var i=0;i<body.autoresId.length;i++){
            autores.push({administradorId,libroId:row.insertId,autorId:parseInt(body.autoresId[i])});
        }
        row = await libroAutorController.save(null, null,autores);
        res.status(200).json({ status: 200, success: 'OK' });
    } else {
        res.status(200).json({ status: 500, error: 'Error en la  insercción' });
    }
}else{
    res.status(200).json({status:500, error:'ISBN no valido'});
}
};


libroController.update = async(req, res)=>{

    const body =req.body;
    if(ISBN.Validate(body.isbn)){
    for(var k in body){
        if(k.split('[]').length>1){
            var respaldo= body[k];
            delete body[k];
            body[k.split('[]')[0]] = respaldo;
        }
    }
    body.libroId = (body.libroId == "") ? null : parseInt(body.libroId);
    body.estatusId = (typeof body.estatusId == 'string') ? parseInt(body.estatusId) : body.estatusId;
    body.eliminadoId = (typeof body.eliminadoId == 'string') ? parseInt(body.eliminadoId) : body.eliminadoId;
    body.editorialId = (typeof body.editorialId == 'string') ? parseInt(body.editorialId) : body.editorialId;
    var row = await libro.update({columns:{ 
        
           isbn:{column:libro.getNameColumn('isbn'), value:body.isbn} , 
           titulo:{column:libro.getNameColumn('titulo'), value:body.titulo}, 
           autoresText: {column:libro.getNameColumn('libroAutor'), value:body.autoresText},
           editorialId: {column:libro.getNameColumn('editorialId'), value:body.editorialId},
           idiomaId: {column:libro.getNameColumn('idiomaId'),value:body.idiomaId}, 
           categoriaId: {column:libro.getNameColumn('categoriaId'), value:body.categoriaId},
           cantidad: {column:libro.getNameColumn('cantidad'), value:body.cantidad},
           fechaModifico:{column:libro.getNameColumn('fechaModifico'), value:dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss")}, 
           usuarioModifico:{column:libro.getNameColumn('usuarioModifico'), value: req.user.administradorId}
    } },{column:libro.getNameColumn('libroId'),value:req.body.libroId});
    if (row != null) {
        var isDelte = libroAutorController.delete(body.libroId, libro.getNameColumn('libroId'));
        if(isDelte != null){
            var administradorId = req.user.administradorId;
        
        const autores = [];
        for(var i=0;i<body.autoresId.length;i++){
            autores.push({administradorId,libroId:body.libroId,autorId:parseInt(body.autoresId[i])});
        }
        row = await libroAutorController.save(null, null,autores);
        res.status(200).json({ status: 200, success: 'OK' });
        }
        
    } else {
        res.status(200).json({ status: 500, error: 'Error en la  actualización' });
    }
}else{
    res.status(200).json({status:500, error:'ISBN no valido'});
}
};

libroController.delete = async(req, res)=>{
    const row = await libro.update({
        columns: {
            eliminadoId: { column: libro.getNameColumn('eliminadoId'), value:ELIMINADO },
            fechaModifico: { column: libro.getNameColumn('fechaModifico'), value: dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss") },
            usuarioModifico:{column:libro.getNameColumn('usuarioModifico'), value:req.user.administradorId}
        }
    },{column:libro.getNameColumn('libroId'), value:req.body.libroId});
    if (row != null) {
        res.status(200).json({ status: 200, success: 'OK' });
    } else {
        res.status(200).json({ status: 500, error: 'Error al intentar eliminar el libro' });
    }
};

libroController.findCriteria = async(req, res)=>{ 
    if(typeof req =="undefined" || typeof res =="undefined"){
        var body= {autorId:null, editorialId:null, nombre:null, orden:null, ordenarAscDesc:null};
        return await findCriteria(body);
    }else{
        const rows = await findCriteria(req.body);
    if(Array.isArray([rows])){
        res.status(200).json({status:200, libros:rows[0]});
    }else{
        res.status(200).json({status:500, error:'Error en la obtención de los libros'});
    }
    }
    
};

async function findCriteria(body){
    var {autorId, editorialId, nombre, orden, ordenarAscDesc} = body;
    autorId =(autorId == null) ? 0:autorId;
    editorialId =(editorialId == null) ? 0:editorialId;
    nombre =(nombre == null) ? "":nombre;
    orden =(orden == null) ? "":orden;
    ordenarAscDesc =(ordenarAscDesc == null) ? "":ordenarAscDesc;
    return  await libro.executeStored('getLibros',[autorId, editorialId,nombre,orden,ordenarAscDesc]);
}

module.exports = libroController;