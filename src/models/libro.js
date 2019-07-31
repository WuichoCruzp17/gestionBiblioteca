const helpers = require('../lib/helpers');
let libro ={};

libro.table= {name:'LIBRO'}

libro.columns ={
    libroId:{
        column:'LIBRO_ID',
        primarykey:true
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

libro = helpers.setFunctionsModels(libro);

module.exports = libro;