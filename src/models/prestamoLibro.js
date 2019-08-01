const helpers = require('../lib/helpers');
let prestamoLibro ={};

prestamoLibro.table ={name:'PRESTAMO_LIBRO'};

prestamoLibro.columns={
    prestamoLibroId:{
        column:'PRESTAMO_LIBRO_ID',
        primarykey:true
    },

    libroId:{
        column:'LIBRO_ID'
    },

    alumnoId:{
        column:'ALUMNO_ID'
    },

    fechaPrestamo:{
        column:'FECHA_PRESTAMO'
    },

    fechaDevolucion:{
        column:'FECHA_DEVOLUCION'
    },

    estatusPrestamo:{
        column:'ESTATUS_PRESTAMO'
    },
    estatusId:{
        column:'ESTATUS_ID'
    },
    
    eliminadoId:{
        column:'ELIMINADO_ID'
    },
    
    fechaCreacion:{
        column:'FECHA_CREACION'
    },
    usuarioCreo:{
        column:'USUARIO_CREO'
    },

    fechaModifico:{
        column:'FECHA_MODIFICO'
    },

    usuarioModifico:{
        column:'USUARIO_MODIFICO'
    }
};

prestamoLibro = helpers.setFunctionsModels(prestamoLibro);

module.exports = prestamoLibro;