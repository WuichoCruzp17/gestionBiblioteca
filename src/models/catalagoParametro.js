const helpers = require('../lib/helpers');
let catalagoParametro ={};

catalagoParametro.table= {name:'CATALAGO_PARAMETRO'}

catalagoParametro.columns ={
    catalagoParametroId:{
        column:'CATALAGO_PARAMETRO_ID',
        primaryKey:true
    },

    catalogoId:{
        column:'CATALOGO_ID'
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

catalagoParametro = helpers.setFunctionsModels(catalagoParametro);

module.exports = catalagoParametro;