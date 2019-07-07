const helpers = require('../lib/helpers');
let editorial ={};

editorial.table= {name:'EDITORIAL'}

editorial.columns ={
    editorialId:{
        column:'EDITORIAL_ID',
        primarykey:true
    },

    nombre:{
        column:'NOMBRE'
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
    usuarioCreo:{
        column:'USUARIO_CREO'
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