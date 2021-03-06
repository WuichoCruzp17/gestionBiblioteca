const dateFormat = require('dateformat');
const {IDIOMA, ESTATUS,ACTIVO, ESTATUS_ELIMANDO,NOELIMINADO} = require('../resources/codeBss');
const libroAutor = require('../models/libroAutor');
const libroAutorController = {};

libroAutorController.save = async(req, res,autores)=>{
    var rows =null;

    if(typeof autores !== 'undefined'){
        if(Array.isArray(autores)){
            rows =[];
            var result = null;
            for(var i =0; i<autores.length;i++){
                result = await libroAutor.save(null,[
                    null,
                    autores[i].libroId, 
                    autores[i].autorId,
                    ACTIVO,
                    NOELIMINADO,
                    dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss"), 
                    autores[i].administradorId, dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss"),
                    autores[i].administradorId]
                    );
            }
            if(result != null){
                rows.push(result);
            }
        }
        return rows;
    }
};

libroAutorController.findProperty = async(req, res)=>{
    var rows = null;
    if(typeof req =="object"){
        
    }else{

        rows = await libroAutor.findByProperty(req,res);
        return rows;
    }

};

libroAutorController.delete = async(objectId, column)=>{
    const row = await libroAutor.delete(objectId, column);
    return row;
};

module.exports = libroAutorController;