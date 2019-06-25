const indexController = {};

indexController.index = (req, res)=>{
    res.render('biblioteca/index');
};

module.exports = indexController;