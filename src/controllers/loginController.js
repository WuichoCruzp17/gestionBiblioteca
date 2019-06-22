const loginController = {};
const perfilController = require('../controllers/perfilController');
const administrador = require('../models/administrador');
loginController.login =async (req, res)=> {
    console.log(perfilController);
    const  perfiles =await perfilController.findAll();
    res.render('login', {perfiles});
};

loginController.getUser = async(login)=>{
    var rows = null;
    switch(login.usuarioId){
        case 1:
            rows = await administrador.findByProperty('email',login.username);
        break;
    }
};

loginController.getLogout = (req, res)=>{
    req.logOut();
};


module.exports = loginController;