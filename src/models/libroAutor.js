const helpers = require('../lib/helpers');
let libroAutor ={};

libroAutor.table= {name:'LIBRO_AUTOR'}

libroAutor.columns ={
    catalagoId:{
        column:'LIBRO_AUTOR_ID',
        primaryKey:true
    },

    libroId:{
        column:'LIBRO_ID'
    },

    autorId:{
        column:'AUTOR_ID'
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

libroAutor = helpers.setFunctionsModels(libroAutor);

module.exports = libroAutor;