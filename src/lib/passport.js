const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');
const loginController = require('../controllers/loginController');
const paginaController = require('../controllers/paginaController');
const administradorController = require('../controllers/administradorController');
passport.use('local.signin',new LocalStrategy({
    usernameField:'username',
    passwordField:'password',
    passReqToCallback:true
}, async(req, username, password, done)=>{
    const login ={
        userId:parseInt(req.body.perfilId),
        username:req.body.username
    };
    var rows = null;
    rows = await loginController.getUser(login);
    if(Array.isArray(rows)){
        if(rows.length>0){
            const user = rows[0];
            const validPassword = await helpers.matchPassword(password, user.contrasena);
            if(validPassword){
                done(null, user, req.flash('success','Welcome '+ user.nombre));
            }else{
                done(null, false, req.flash('message', 'Incorrect Password'));
            }
        }else{
            return done(null,false, req.flash('message','The Username does not exists'));
        }
    }
}

));

/**
 * Función que se encarga de ejecutar una funcion para la creación del usuario
 */
passport.use('local.signup',new LocalStrategy({
    usernameField:'username',
    passwordField:'password',
    passReqToCallback:true
}, async(req, username, password, done)=>{
    console.log("Despues de valiar el usuario LocalStrategy passpor.js");
    var newUser ={};
    switch(req.body.perfilId){
        case 1:
                newUser = {administradorId, nombre, apellidoPaterno, apellidoMaterno} = req.body;
        break;
    }
    return done(null, newUser);
}));

/**
 * Función que se encarga de guardar la session del usuario
 */
passport.serializeUser(async (user, done) => {
     console.log("Usuario Serelize User: ", user);
     switch(user.perfilId){
         case 1:
            var paginas = await paginaController.menu(user.perfilId);
            user.paginas = paginas[0];
            user.menuHtml = await paginaController.buildMenuHtml(user.paginas);
         done(null, user);
         break;
     }
 });

/**
 * Función que se encarga de validar si hay una cuenta de usuaria existente.
 */
passport.deserializeUser(async(user,done)=>{
    var rows = null;
    if(typeof user != 'object'){
        if(user.hasOwnProperty('administradorId')){
            rows = await administradorController.findByProperty('administradorId',user.administradorId);
            done(null,rows);
        }
    }
    done(null,user);
});