const loginController = {};
const passport = require('passport');
const perfilController = require('../controllers/perfilController');
const administrador = require('../models/administrador');
loginController.login =async (req, res)=> {
    console.log(perfilController);
    const  perfiles =await perfilController.findAll();
    res.render('login', {perfiles});
};

loginController.getUser = async(login)=>{
    var rows = null;
    switch(login.userId){
        case 1:
            console.log("Admministrador");
            rows = await administrador.findByProperty('correo',login.username);
        break;
    }
    return rows;
};

loginController.validateSession =async(req, res, next)=>{
  await passport.authenticate('local.signin',{
    successRedirect:'/biblioteca/index',
    failureRedirect:'/'
   })(req, res, next);
};

loginController.getLogout = (req, res)=>{
    req.logOut();
};


module.exports = loginController;