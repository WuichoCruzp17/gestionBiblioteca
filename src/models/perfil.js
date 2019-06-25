const helpers = require('../lib/helpers');
let perfil ={};

perfil.table= {name:'PERFIL'}

perfil.columns ={
    perfilId:{
        column:'PERFIL_ID',
        primaryKey:true
    },

    nombre:{
        column:'NOMBRE'
    },

    descripcion:{
        column:'DESCRIPCION'
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
        column:'USUARIO_CREO'
    },

    fechaModifico:{
        column:'FECHA_MODIFICO'
    },

    usuarioModifico:{
        column:'USUARIO_Modifico'
    }

};

perfil = helpers.setFunctionsModels(perfil);

module.exports = perfil;