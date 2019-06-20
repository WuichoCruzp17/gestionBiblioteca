const {util, utilString} = require('../lib/util');
const bdComponents={};

bdComponents.crud = {
    INSERT:"INSERT INTO $table VALUES(?)",
    UPDATE:"UPDATE $table SET $columns",
    SELECT:"SELECT * FROM $table  $WHERE",
    DELETE:"DELETE FROM $table WHERE $where"
};

bdComponents.operadores ={
    SUM:"+",
    DECR:"-",
    MULT:"*",
    DIV:"/",
    MODU:"%"
};

bdComponents.operadoresLogicos ={
    ig:'=',
    and:'and',
    or:'or',
    my:'>',
    mn:'>',
    myIg:'>=',
    mnIg:'<=',
    dif:'!='

};

bdComponents.functions ={
    /**
     * Función que se encarga de  retornar un String de un COUNT(...) dependiendo de
     * la columna que se desa contar.
     * @param {String} column 
     * @param {String} name
     */
    COUNT:function(column, name){
        return  (name !==undefined && name !== null)?`COUNT(${column}) as ${name}` :`COUNT(${column})`
    },

    CONCAT:function(columns,name){
        var _string ="CONCAT(";
        if(Array.isArray(columns)){
            const c = columns.length -1;
            for(var i=0;i<columns.length;i++){
                _string += (i<c) ? `${columns[i]}, ` : columns[i];
            }
            return _string+=(name !== undefined && name !== null) ? ")" + " as " + name:")";
        }
        return "";
    },
    /**
     * Función que se encarga de retornar un String de un SUM(...) con las columna(s) que
     * se desa sumar.
     * @param {Array} columns 
     * @param {String} operador 
     * @param {String} name 
     */
    SUM:function(columns,operador, name){
        var sum ="SUM(";
        if(Array.isArray(columns)){
            const c = columns.length -1;
            for(var i=0;i<columns.length;i++){
                sum+= (i<c) ? `${columns[i]} ${operador}`:`${columns[i]}`;
            }
            return sum+=(name !== undefined && name !== null) ? ")" + " as " + name:")";
        }else if(utilString.validateString(columns)){
            return `SUM(${columns})`;
        }
    },
    NOW:function(){
        return "NOW()";
    }
};

bdComponents.createSelect = function(){
    
};

const Criteria  ={};
Criteria.getColumns = (map)=>{
   return  map.keys();
};

module.exports  = bdComponents;