const catalogoParametro = require('../models/catalagoParametro');
const catalogoParametroController = {};

catalogoParametroController.findByProperty = async (property, value)=>{
    return await catalogoParametro.findByProperty(property, value);
};

module.exports = catalogoParametroController;