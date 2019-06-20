const helpers = require('../lib/helpers');
let catalagoParametro ={};

catalagoParametro.table= {name:'CATALAGO'}

catalagoParametro.columns ={
    catalagoId:{
        column:'CATALAGO_PARAMETRO_ID',
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
        column:'USUARIO_CREACION'
    },

    fechaModifico:{
        column:'FECHA_MODIFICO'
    },

    usuarioModifico:{
        column:'USUARIO_Modifico'
    }

};

catalagoParametro = helpers.setFunctionsModels(catalagoParametro);

module.exports = catalagoParametro;