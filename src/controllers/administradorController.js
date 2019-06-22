const administrador = require('../models/administrador');
const bdComponents  = require('../utilsModels/bdComponents');
const administradorController = {};
var cols = {
    administradorId: administrador.getNameColumn('administradorId'),
    perfilId:administrador.getNameColumn('perfilId'),
    concat: bdComponents.functions.CONCAT([administrador.getNameColumn('nombre'), administrador.getNameColumn('apellidoPaterno'), administrador.getNameColumn('apellidoMaterno')], "nombre"),
    email: administrador.getNameColumn('correo')
};
administradorController.findByProperty = async(property,value) =>{
    return await administrador.findByProperty(property,value, cols);
}

module.exports = administradorController;