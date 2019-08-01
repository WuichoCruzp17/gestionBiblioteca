const prestamoLibro = require('../models/prestamoLibro');
const libroController = require('../controllers/libroController');
const alumnoController = require('../controllers/alumnoController');
const catalagoParametroController = require('../controllers/catalogoParametroController');
const dateFormat  = require('dateformat');
const {ACTIVO, NOELIMINADO,ESTATUS_PRESTAMO, PRESTAMO, DEVUELTO, TURNO,MESES} = require('../resources/codeBss');
const prestamoLibroController = {};
prestamoLibroController.index = async(req, res)=>{
    var libroList = await libroController.findCriteria();
    var alumnoList = await alumnoController.findAll();
    var estatusPrestamoList = await catalagoParametroController.findByProperty('catalogoId',TURNO);
    console.log(estatusPrestamoList);
    libroList = (Array.isArray(libroList))? libroList[0]:[];
    alumnoList = (Array.isArray(alumnoList)) ?alumnoList:[];
    estatusPrestamoList = (Array.isArray(estatusPrestamoList)) ? estatusPrestamoList:[];
    res.render('biblioteca/prestamos', {libroList,alumnoList,estatusPrestamoList});
}

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
        if(isPresatmoAlumno){
            res.status(200).json({status:501, error:"El alumno ya cuenta con un libro prestado"});
        }else{
            const isValidate  = (libro.cantidad > prestamos.length) ? true :false;
            res.status(200).json({status:200, isValidate});
        }
    }else{
        res.status(200).json({status:500, error:"Hubo un problema al validar el sotck"});
    }
    
};

prestamoLibroController.save = async(req, res)=>{
    const body = req.body;
    body.prestamoLibroId = (body.prestamoLibroId == "") ? null : parseInt(body.prestamoLibroId);
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
        ]);
        if(row != null){
            res.status(200).json({status:200});
        }else{
            res.status(200).json({status:500, error:"Hubo un problema en el servidor"});
        }
};

prestamoLibroController.findByCriteria = async(req, res)=>{
    const {fechaInicial, fechaFinal, turno}  = req.body;
    var rows = await prestamoLibro.executeStored('getPrestamos',[fechaInicial,fechaInicial,turno]);
   
    if(Array.isArray(rows)){
        rows = (rows.length>0) ? rows[0]:[];
        var d = null;
        for(var i=0;i<rows.length;i++){
            d = new Date(rows[i].fechaPrestamo);
            rows[i].fechaPrestamo = MESES[d.getMonth()] +" "+ ((d.getDate()>=10)?  d.getDate():"0"+d.getMonth()) +" del " +d.getFullYear();
            d = null;
            d = new Date(rows[i].fechaDevolucion);
            rows[i].fechaDevolucion = MESES[d.getMonth()] +" "+ ((d.getDate()>=10)?  d.getDate():"0"+d.getMonth()) +" del " +d.getFullYear();
        }
        console.log(rows);
        res.status(200).json({status:200, prestamoList:rows});
    }else{
        res.status(200).json({status:200,error:"Hubo un error en la obtención de los prestamos"});
    }

};

async function findByProperty(property, value){
    const rows = await prestamoLibro.findByProperty(property, value);
    return (Array.isArray(rows)) ? rows :[];
}

module.exports = prestamoLibroController;