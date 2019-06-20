const helpers = require('../lib/helpers');
let administrador ={};

administrador.table= {name:'ADMINISTRADOR'}

administrador.columns ={
    catalagoId:{
        column:'ADMINISTRADOR_ID',
        primaryKey:true
    },

    nombre:{
        column:'NOMBRE'
    },

    perfilAccessoId:{
        column:'PEFIL_ACCESO_ID'
    },

    apellidoPaterno:{
        column:'APELLIDO_PATERNO'
    },

    apellidoMaterno:{
        column:'APELLIDO_MATERNO'
    },  
    constrasena:{
        column:'CONSTRASENA'
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

administrador = helpers.setFunctionsModels(administrador);

module.exports = administrador;