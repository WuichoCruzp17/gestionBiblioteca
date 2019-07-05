const helpers = require('../lib/helpers');
let autor ={};

autor.table= {name:'AUTOR'}

autor.columns ={
    autorId:{
        column:'AUTOR_ID',
        primarykey:true
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

autor = helpers.setFunctionsModels(autor);

module.exports = autor;