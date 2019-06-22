const helpers = require('../lib/helpers');
let alumno ={};

alumno.table= {name:'ALUMNO'}

alumno.columns ={
    catalagoId:{
        column:'ALUMNO_ID',
        primaryKey:true
    },
    perfilId:{
        column:'PERFIL_ID'
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
    
    fechaCreacion:{
        column:'FECHA_CREACION'
    },
    usuarioCreacion:{
        column:'USUARIO_CREACION'
    },

    fechaModifico:{
        column:'FECHA_MODIFICO'
    },

    usuarioModifico:{
        column:'USUARIO_Modifico'
    }

};

alumno = helpers.setFunctionsModels(alumno);

module.exports = alumno;