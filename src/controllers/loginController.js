const loginController = {};
const perfilController = require('../controllers/perfilController');
loginController.login =async (req, res)=> {
    console.log(perfilController);
    const  perfiles =await perfilController.findAll();
    res.render('login', {perfiles});
};
module.exports = loginController;