const helpers = require('../lib/helpers');
let alumno ={};

alumno.table= {name:'ALUMNO'}

alumno.columns ={
    alumnoId:{
        column:'ALUMNO_ID',
        primarykey:true
    },

    matricula:{
        column:'MATRICULA'
    },
    nombre:{
        column:'NOMBRE'
    },

    apellidoPaterno:{
        column:'APELLIDO_PATERNO'
    },

    apellidoMaterno:{
        column:'APELLIDO_MATERNO'
    },

    grado:{
        column:'GRADO'
    },
    grupo:{
        column:'GRUPO'
    },

    mobilidad:{
        column:'MOBILIDAD'
    },

    turno:{
        column:'TURNO'
    },  
    
    estatusId:{
        column:'ESTATUS_ID'
    },
    
    eliminadoId:{
        column:'ELIMINADO_ID'
    },
    
    fechaCreo:{
        column:'FECHA_CREO'
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

alumno = helpers.setFunctionsModels(alumno);

module.exports = alumno;