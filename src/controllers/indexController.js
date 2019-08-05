const administradorController = require('../controllers/administradorController');
const alumnoController = require('../controllers/alumnoController');
const libroController = require('../controllers/libroController');
const prestamoLibroController = require('../controllers/prestamoLibroController');
const {ACTIVO, NOELIMINADO,ESTATUS_PRESTAMO, PRESTAMO, DEVUELTO, TURNO,MESES} = require('../resources/codeBss');
const indexController = {};

indexController.index = async (req, res)=>{
    
    res.render('biblioteca/index');
};

indexController.findArticle = async(req ,res)=>{
    const a =[];
    const administradorList = await administradorController.findAll();
    const alumnoList = await alumnoController.findAll();
    const libroList =await libroController.findCriteria();
    const prestamoLibroList = await prestamoLibroController.findAll();
    if(Array.isArray(administradorList)){
        a.push({name:'Administradores', c:administradorList.length, icon:'zmdi zmdi-face'});
    }
    if(Array.isArray(alumnoList)){
        a.push({name:'Alumnos', c:alumnoList.length, icon:'zmdi zmdi-accounts'});
    }

    if(Array.isArray(libroList)){
        a.push({name:'Libros', c:libroList.length, icon:'zmdi zmdi-book'});
    }
    const prestamos=[];
    const devueltos=[];
    if(Array.isArray(prestamoLibroList)){
        for(var i=0;i<prestamoLibroList.length;i++){
            if(prestamoLibroList[i].estatusPrestamo ==PRESTAMO){
                prestamos.push(prestamoLibroList[i]);
            }else{
                devueltos.push(prestamoLibroList[i]);
            }
        }
    }
    a.push({name:'Préstamos',c:prestamos.length, icon:'zmdi zmdi-calendar'});
    a.push({name:'Devueltos',c:devueltos.length, icon:'zmdi zmdi-calendar'});
    console.log(a);
    res.status(200).json({articles:a});
};

module.exports = indexController;