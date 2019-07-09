const helpers = require('../lib/helpers');
let categoria ={};

categoria.table= {name:'CATEGORIA'}

categoria.columns ={
    categoriaId:{
        column:'CATEGORIA_ID',
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

categoria = helpers.setFunctionsModels(categoria);

module.exports = categoria;