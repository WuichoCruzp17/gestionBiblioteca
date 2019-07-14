const handlebars =  require('handlebars');
const helpers ={};

helpers.handlebars = function(html){
    console.log("Handlebars--->"+handlebars.SafeString);
    return new  handlebars.SafeString(html);
}

module.exports = helpers;