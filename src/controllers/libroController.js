const libro = require('../models/libro');
const dateFormat = require('dateformat');
const editorialController = require('../controllers/editorialController');
const catalagoParametroController = require('../controllers/catalogoParametroController');
const categorioController = require('../controllers/categoriaController');
const autorController = require('../controllers/autorController');
const {IDIOMA, ESTATUS, ESTATUS_ELIMANDO} = require('../resources/codeBss');
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
    console.log("ISBN NO VALIDO");
    res.status(200).json({status:500, error:'ISBN no valido'});
}
};

libroController.findCriteria = async(req, res)=>{

    var {autorId, editorialId, nombre, orden, ordenarAscDesc} = req.body;
    autorId =(autorId == null) ? 0:autorId;
    editorialId =(editorialId == null) ? 0:editorialId;
    nombre =(nombre == null) ? "":nombre;
    orden =(orden == null) ? "":orden;
    ordenarAscDesc =(ordenarAscDesc == null) ? "":ordenarAscDesc;
    console.log("Parametors de entradad: ", req.body);
    const rows = await libro.executeStored('getLibros',[autorId, editorialId,nombre,orden,ordenarAscDesc]);
   
    if(Array.isArray([rows])){
        console.log("Rows-->", rows[0]);
        res.status(200).json({status:200, libros:rows[0]});
    }else{
        res.status(200).json({status:500, error:'Error en la obtención de los libros'});
    }
    
};

module.exports = libroController;