const helpers = require('../lib/helpers');
let editorial ={};

editorial.table= {name:'EDITORIAL'}

editorial.columns ={
    catalagoId:{
        column:'EDITORIAL_ID',
        primaryKey:true
    },

    nombre:{
        column:'NOMBRE_EDITORIAL'
    },

    direccion:{
        column:'DIRECCON'
    },

    telefono:{
        column:'TELEFONO'
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

editorial = helpers.setFunctionsModels(editorial);

module.exports = editorial;