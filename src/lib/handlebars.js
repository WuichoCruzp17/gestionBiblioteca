const handlebars =  require('handlebars');
const helpers ={};

helpers.fullName = function(user){
    console.log(user);
    return (user) ?`${user.nombre} ${user.apellidoPaterno} ${user.apellidoMaterno}` :"";
};
helpers.handlebars = function(html){
    return new  handlebars.SafeString(html);
}

module.exports = helpers;