const helpers = require('../lib/helpers');
let perfilAcceso ={};

perfilAcceso.table= {name:'PEFIL_ACCESO'}

perfilAcceso.columns ={
    catalagoId:{
        column:'PEFIL_ACCESO_ID',
        primaryKey:true
    },

    perfilId:{
        column:'PERFIL_ID'
    },

    paginaId:{
        column:'PAGINA_ID'
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

perfilAcceso = helpers.setFunctionsModels(perfilAcceso);

module.exports = perfilAcceso;