const authController ={};
const passport =    require('passport');


authController.getLogout =(req, res)=>{
    console.log('Entro');
    req.logOut();
    res.redirect('/');
};

module.exports = authController;