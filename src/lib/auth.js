const pool =    require('../database');
module.exports = {
    isLoggedIn (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/');
    },
     isNotLoogedin(req, res, next){
        if(!req.isAuthenticated()){
            return next();
        }else{
            return res.redirect('/');
        }
     },
     validateAccesousUsuario(req, res, next){
         const url = (req.url !=="/") ? req.url :req.baseUrl;
        console.log(req.user);
         if(req.user.hasOwnProperty('administradorId')){
            const pages = req.user.paginas;
            for(var i=0; i<pages.length;i++){
                if(pages[i].url === url){
                    return next();
                }
            }
            return res.redirect('/biblioteca/index');
         }
        
            
        
     }
};