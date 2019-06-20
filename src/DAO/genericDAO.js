const pool = require('../database');

const genericDAO = {};

genericDAO.execute = async (query, params) => {
        console.log("Query -->",query);
        var rows = null;
        if (typeof params === "undefined") {
          await    pool.query(query).then(function(result){
                rows = result;
            }).catch(function(err){
                rows = null;
                console.log("Error ->"+err);
            });
        } else {
          await  pool.query(query, params).then(function(result){
                rows = result;
            }).catch(function(err){
                rows = null;
                console.log("Error -->",err);
            });
        }
        return rows;
};
module.exports = genericDAO;