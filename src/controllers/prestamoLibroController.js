const prestamoLibro = require('../models/prestamoLibro');
const libroController = require('../controllers/libroController');
const alumnoController = require('../controllers/alumnoController');
const catalagoParametroController = require('../controllers/catalogoParametroController');
const dateFormat  = require('dateformat');
const {ACTIVO, NOELIMINADO,ESTATUS_PRESTAMO, PRESTAMO, DEVUELTO, TURNO,MESES} = require('../resources/codeBss');
const prestamoLibroController = {};
prestamoLibroController.index = async(req, res)=>{
    //estatusPrestamoList
    var libroList = await libroController.findCriteria();
    var alumnoList = await alumnoController.findAll();
    var turnoList = await catalagoParametroController.findByProperty('catalogoId',TURNO);
    var estatusPrestamoList = await catalagoParametroController.findByProperty('catalogoId',ESTATUS_PRESTAMO);
    libroList = (Array.isArray(libroList))? libroList[0]:[];
    alumnoList = (Array.isArray(alumnoList)) ?alumnoList:[];
    estatusPrestamoList = (Array.isArray(estatusPrestamoList)) ? estatusPrestamoList:[];
    res.render('biblioteca/prestamos', {libroList,alumnoList,estatusPrestamoList,turnoList});
}

prestamoLibroController.findById = async(req, res)=>{
    const prestamoLibroId   = req.params.id;
    const row =await  prestamoLibro.findById(prestamoLibroId);
    if(row != null){
        res.status(200).json({status:200, prestamoLibro:row});
    }else{
        res.status(200).json({status:500, error:'Hubo un problema en el servidor'});
    }
};

prestamoLibroController.validateStock = async(req, res)=>{
    const {libroId, alumnoId} = req.body;
    const libro  = await libroController.findById(libroId);
    if(libro != null){
        const prestamos = await findByProperty('libroId', libroId);
        const alumnoPrestamos = await findByProperty('alumnoId',alumnoId);
        var isPresatmoAlumno = false;
        console.log(alumnoPrestamos);
        for(var i=0; i<alumnoPrestamos.length;i++){
            if(alumnoPrestamos[i].estatusPrestamo ==PRESTAMO){
                isPresatmoAlumno = true;
                break;
            }
        }
        const p = [];
        for(var j =0; j<prestamos.length;j++){
            if(prestamos[j].estatusPrestamo ==PRESTAMO){
                p.push(prestamos[j]);
            }
        }
        if(isPresatmoAlumno){
            res.status(200).json({status:501, error:"El alumno ya cuenta con un libro prestado"});
        }else{
            const isValidate  = (libro.cantidad > p.length) ? true :false;
            res.status(200).json({status:200, isValidate});
        }
    }else{
        res.status(200).json({status:500, error:"Hubo un problema al validar el sotck"});
    }
    
};

prestamoLibroController.save = async(req, res)=>{
    const body = req.body;
    /* body.prestamoLibroId = (body.prestamoLibroId == "") ? null : parseInt(body.prestamoLibroId);
    body.libroId = (body.libroId == "") ? null : parseInt(body.libroId);
    body.alumnoId = (body.alumnoId == "") ? null : parseInt(body.alumnoId);
    var fechaDevolucion = new Date();
    fechaDevolucion.setDate(fechaDevolucion.getDate()+7);
    console.log( dateFormat(fechaDevolucion,"yyyy-mm-dd"));
    var row = await prestamoLibro.save(null, 
        [
            body.prestamoLibroId, 
            body.libroId, 
            body.alumnoId, 
            dateFormat(new Date(), "yyyy-mm-dd"),
            dateFormat(fechaDevolucion,"yyyy-mm-dd"),
            PRESTAMO,
            ACTIVO, 
            NOELIMINADO, 
            dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss"), 
            req.user.administradorId,
             dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss"), 
            req.user.administradorId
        ]); */
        const row = await save(body,req.user.administradorId);
        if(row != null){
            res.status(200).json({status:200});
        }else{
            res.status(200).json({status:500, error:"Hubo un problema en el servidor"});
        }
};


prestamoLibroController.findByCriteria = async(req, res)=>{
    console.log(req.body);
    const {fechaInicial, fechaFinal, turno, estatus}  = req.body;
    console.log(fechaInicial, fechaFinal, turno);
    var rows = await prestamoLibro.executeStored('getPrestamos',[fechaInicial,fechaFinal,parseInt(turno), parseInt(estatus)]);
   
    if(Array.isArray(rows)){
        rows = (rows.length>0) ? rows[0]:[];
        var d = null;
        for(var i=0;i<rows.length;i++){
            d = new Date(rows[i].fechaPrestamo);
            rows[i].fechaPrestamo = MESES[d.getMonth()] +" "+ ((d.getDate()>=10)?  d.getDate():"0"+d.getDate()) +" del " +d.getFullYear();
            d = null;
            d = new Date(rows[i].fechaDevolucion);
            rows[i].fechaDevolucion = MESES[d.getMonth()] +" "+ ((d.getDate()>=10)?  d.getDate():"0"+d.getDate()) +" del " +d.getFullYear();
        }
        
        res.status(200).json({status:200, prestamoList:rows});
    }else{
        res.status(200).json({status:200,error:"Hubo un error en la obtención de los prestamos"});
    }

};

async function findByProperty(property, value){
    const rows = await prestamoLibro.findByProperty(property, value);
    return (Array.isArray(rows)) ? rows :[];
}

async function save(body,administradorId){
  
    body.prestamoLibroId = (body.prestamoLibroId == "") ? null : parseInt(body.prestamoLibroId);
    body.libroId = (body.libroId == "") ? null : parseInt(body.libroId);
    body.alumnoId = (body.alumnoId == "") ? null : parseInt(body.alumnoId);
    var fechaDevolucion = new Date();
    fechaDevolucion.setDate(fechaDevolucion.getDate()+7);
    console.log( dateFormat(fechaDevolucion,"yyyy-mm-dd"));
    return  await prestamoLibro.save(null, 
        [
            body.prestamoLibroId, 
            body.libroId, 
            body.alumnoId, 
            dateFormat(new Date(), "yyyy-mm-dd"),
            dateFormat(fechaDevolucion,"yyyy-mm-dd"),
            PRESTAMO,
            ACTIVO, 
            NOELIMINADO, 
            dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss"), 
            administradorId,
             dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss"), 
            administradorId
        ]);
        
}

prestamoLibroController.update = async(req, res)=>{
    const {prestamoLibroId} = req.body;
    const row = await prestamoLibro.update({
        columns:{
            estatusPrestamo:{column:prestamoLibro.getNameColumn('estatusPrestamo'),value:DEVUELTO},
            usuarioModifico:{column:prestamoLibro.getNameColumn('usuarioModifico'),value:req.user.administradorId},
            fehaModifico:{column:prestamoLibro.getNameColumn('fechaModifico'), value: dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss")}
        }
    },{column:prestamoLibro.getNameColumn('prestamoLibroId'),value:prestamoLibroId});
    if(row != null){
        res.status(200).json({status:200,success:'OK'});
    }else{
        res.status(200).json({status:500, error:'Error en el srvidor'});
    }
};

prestamoLibroController.delete = async(req, res)=>{
 const prestamoLibroId = req.params.id;
 const isDelete = await prestamoLibro.delete(prestamoLibroId);
 if(isDelete != null){
     res.status(200).json({status:200});
 }else{
     res.status(200).json({status:500,error:'Error  al eliminar el prestamo'});
 }
};

prestamoLibroController.findAll = async(req,res)=>{
    return await prestamoLibro.findAll();
};

module.exports = prestamoLibroController;