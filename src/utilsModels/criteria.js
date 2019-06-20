function Criteria(obj){

    this.object = obj;
    this.criteria =(qr, params)=>{
        
        for(var i=0;i<params.length;i++){
            qr = qr.replace("col",params[i].col);
            qr =  qr.replace("?",params[i].val);
             
         }
       return qr;
    };
    

    }
/**
 * @param qr = "col =2 and  col = ? "
 * @param params = 
 * var params =[
    {col:'empleadoId', val:2}
];
 */
    module.exports =Criteria;