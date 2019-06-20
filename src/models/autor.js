const helpers = require('../lib/helpers');
let autor ={};

autor.table= {name:'AUTOR'}

autor.columns ={
    catalagoId:{
        column:'AUTOR_ID',
        primaryKey:true
    },

    nombre:{
        column:'NOMBRE'
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

autor = helpers.setFunctionsModels(autor);

module.exports = autor;