const helpers = require('../lib/helpers');
let libro ={};

libro.table= {name:'LIBRO'}

libro.columns ={
    libroId:{
        column:'LIBRO_ID',
        primaryKey:true
    },

    isbn:{
        column:'ISBN'
    },

    titulo:{
        column:'TITULO'
    },

    libroAutor:{
        column:'LIBRO_AUTOR'
    },

    editorialId:{
        column:'EDITORIAL_ID'
    },

    idiomaId:{
        column:'IDIOMA'
    },

    categoriaId:{
        column:'CATEGORIA_ID'
    },

    cantidad:{
        column:'CANTIDAD'
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

libro = helpers.setFunctionsModels(libro);

module.exports = libro;