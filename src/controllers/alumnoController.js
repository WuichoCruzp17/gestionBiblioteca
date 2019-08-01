const alumno = require('../models/alumno');
const dateFormat = require('dateformat');
const catalagoParametroController = require('../controllers/catalogoParametroController');
const {IDIOMA, ESTATUS, ESTATUS_ELIMANDO,ELIMINADO, GRADO,GRUPO,MOBILIDAD, TURNO} = require('../resources/codeBss');
const alumnoController = {};

alumnoController.index = async(req, res)=>{
    var catalagoParametroAI = await catalagoParametroController.findByProperty('catalogoId',ESTATUS);
    var catalagoParametroENE = await catalagoParametroController.findByProperty('catalogoId',ESTATUS_ELIMANDO);
    var gradoListo = await catalagoParametroController.findByProperty('catalogoId',GRADO);
    var grupoList = await catalagoParametroController.findByProperty('catalogoId',GRUPO);
    var mobilidadList = await catalagoParametroController.findByProperty('catalogoId',MOBILIDAD);
    var turnoList = await catalagoParametroController.findByProperty('catalogoId',TURNO);
    catalagoParametroAI = (catalagoParametroAI !== null) ? catalagoParametroAI:[];
    catalagoParametroENE = (catalagoParametroENE != null) ? catalagoParametroENE:[];
    gradoListo = (gradoListo != null) ? gradoListo:[];
    grupoList = (grupoList != null) ? grupoList:[];
    mobilidadList = (grupoList != null) ? mobilidadList:[];
    turnoList = (turnoList != null) ? turnoList:[];
    res.render('biblioteca/alumno',{activoInactivo:catalagoParametroAI, eliminadoList:catalagoParametroENE,gradoListo,grupoList,mobilidadList,turnoList});
};

alumnoController.validateMatricula = async(req, res)=>{
    const row = await findByProperty('matricula',req.params.matricula);
    console.log("Matricula");
    if(Array.isArray(row)){
        if(row.length >0){
            res.status(200).json({status:500, error:'Este alumno ya esta registrado'});
        }else{
            res.status(200).json({status:200, success:'OK'});
        }
    }else{
        res.status(200).json({status:500, error:'Hubo un problema al validar la matricula'});
    }
};

alumnoController.findById = async(req, res)=>{
    const row = await alumno.findById(req.params.id);
    if(row != null){
        res.status(200).json({ status: 200,  alumno:row});
    }else{
        res.status(200).json({status:500, error:'Se ha produccido un error inesperado'});
    }
};
alumnoController.save = async(req, res)=>{
    const body  = req.body;
    body.alumnoId = (body.alumnoId == "") ? null : parseInt(body.alumnoId);
    body.grado = (typeof body.grado == 'string') ? parseInt(body.grado) : body.grado;
    body.grupo = (typeof body.grupo == 'string') ? parseInt(body.grupo) : body.grupo;
    body.mobilidad = (typeof body.grupo == 'string') ? parseInt(body.grupo) : body.mobilidad;
    body.turno = (typeof body.grupo == 'string') ? parseInt(body.grupo) : body.turno;
    body.estatusId = (typeof body.estatusId == 'string') ? parseInt(body.estatusId) : body.estatusId;
    body.eliminadoId = (typeof body.eliminadoId == 'string') ? parseInt(body.eliminadoId) : body.eliminadoId;
    body.editorialId = (typeof body.editorialId == 'string') ? parseInt(body.editorialId) : body.editorialId;
   const row = await alumno.save(null,[
    body.alumnoId, 
    body.matricula, 
    body.nombre, 
    body.apellidoPaterno,
    body.apellidoMaterno,
    body.grado, 
    body.grupo,
    body.mobilidad, 
    body.turno, 
    body.estatusId, 
    body.eliminadoId, 
    dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss"), 
    req.user.administradorId,
     dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss"), 
    req.user.administradorId
   ]);
   if(row != null){
    res.status(200).json({ status: 200, success: 'OK' });
   }else{
    res.status(200).json({ status: 500, error: 'Hubo un problema al intentar registrar el alumno' });
   }
};

alumnoController.update = async(req, res)=>{
    const {alumnoId, matricula, nombre,apellidoPaterno, apellidoMaterno,grado,grupo,mobilidad,turno} = req.body;
    const row = await alumno.update({
        columns:{
            matricula:{column:alumno.getNameColumn('matricula'), value:matricula},
            nombre:{column:alumno.getNameColumn('nombre'),value:nombre},
            apellidoPaterno:{column:alumno.getNameColumn('apellidoPaterno'),value:apellidoPaterno},
            apellidoMaterno:{column:alumno.getNameColumn('apellidoMaterno'),value:apellidoMaterno},
            grado:{column:alumno.getNameColumn('grado'),value:grado},
            grupo:{column:alumno.getNameColumn('grupo'),value:grupo},
            mobilidad:{column:alumno.getNameColumn('mobilidad'),value:mobilidad},
            turno:{column:alumno.getNameColumn('turno'),value:turno},
            usuarioModifico:{column:alumno.getNameColumn('usuarioModifico'),value:req.user.administradorId},
            fehaModifico:{column:alumno.getNameColumn('fechaModifico'), value: dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss")}
        }
    },{column:alumno.getNameColumn('alumnoId'),value:alumnoId});
    if(row != null){
        res.status(200).json({status:200, success:'OK'});
    }else{
        res.status(500).json({status:500, error:'Error en el srvidor'});
    }
};

alumnoController.delete = async(req, res)=>{
    const row = await alumno.update({
        columns: {
            eliminadoId: { column: alumno.getNameColumn('eliminadoId'), value:4 },
            fechaModifico: { column: alumno.getNameColumn('fechaModifico'), value: dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss") }
        }
    },{column:alumno.getNameColumn('alumnoId'), value:req.body.alumnoId});
    if (row != null) {
        res.status(200).json({ status: 200, success: 'OK' });
    } else {
        res.status(500).json({ status: 500, error: 'Error en el srvidor' });
    }
};

alumnoController.findByCriteria  = async(req, res)=>{
    var {matricula,grado,grupo, mobilidad, turno} = req.body;
    grad = (grado ==null) ? 0:grado;
    grupo = (grupo ==null) ? 0:grupo;
    mobilidad = (mobilidad ==null) ? 0:mobilidad;
    turno = (turno ==null) ? 0:turno;
    var alumnoList = await alumno.executeStored('getAlumnos',[matricula,grado,grupo,mobilidad,turno]);
    if(Array.isArray(alumnoList)){
        alumnoList = alumnoList[0];
    var gradoList = await catalagoParametroController.findByProperty('catalogoId',GRADO);
    var grupoList = await catalagoParametroController.findByProperty('catalogoId',GRUPO);
    var mobilidadList = await catalagoParametroController.findByProperty('catalogoId',MOBILIDAD);
    var turnoList = await catalagoParametroController.findByProperty('catalogoId',TURNO);
    gradoList = (gradoList != null) ? gradoList:[];
    grupoList = (grupoList != null) ? grupoList:[];
    mobilidadList = (grupoList != null) ? mobilidadList:[];
    turnoList = (turnoList != null) ? turnoList:[];
    for(var i=0; i<alumnoList.length;i++){
        for(var j=0;j<gradoList.length;j++){
          
            if(alumnoList[i].grado == gradoList[j].catalagoParametroId){
                alumnoList[i].grado = gradoList[j].nombre;
            }
        }

        for(var k=0; k<grupoList.length;k++){
            if(alumnoList[i].grupo == grupoList[k].catalagoParametroId){
                alumnoList[i].grupo =grupoList[k].nombre;
            }
        }

        for(var l=0; l<mobilidadList.length;l++){
            if(alumnoList[i].mobilidad == mobilidadList[l].catalagoParametroId){
                alumnoList[i].mobilidad =mobilidadList[l].nombre;
            }
        }

        for(var m=0; m<turnoList.length;m++){
            if(alumnoList[i].turno == turnoList[m].catalagoParametroId){
                alumnoList[i].turno =turnoList[m].nombre;
            }
        }
    }
    res.status(200).json({status:200, alumnoList});
    }else{
        res.status(200).json({status:500, error:''});
    }

};

alumnoController.findAll = async(req, res)=>{
    if(typeof req =="undefined"){
        return await findAll();
    }else{
        const rows = await findAll();
        if(Array.isArray(rows)){
            res.status(200).json({status:200, alumnoList:rows[0]});
        }else{
            res.status(200).json({status:500, error:'Error en el servidor'});
        }
    }
};

async function findByProperty(property, value){
    return await alumno.findByProperty(property, value);
}

async function findAll(){
 return await alumno.findAll();
}


module.exports = alumnoController;