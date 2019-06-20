const perfilController ={};
const perfi = require('../models/perfil');

perfilController.findAll = async()=>{
    const rows = await perfi.findAll();
    return rows;
}

module.exports = perfilController;