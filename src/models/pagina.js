const helpers = require('../lib/helpers');
let pagina ={};

pagina.table= {name:'PAGINA'}

pagina.columns ={
    catalagoId:{
        column:'PAGINA_ID',
        primaryKey:true
    },

    nombre:{
        column:'NOMBRE'
    },

    url:{
        column:'URL'
    },

    seccion:{
        column:'SECCION'
    },

    incluirMenu:{
        column:'INCLUIR_MENU'
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

pagina = helpers.setFunctionsModels(pagina);

module.exports = pagina;