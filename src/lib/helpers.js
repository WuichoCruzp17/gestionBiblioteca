const bcryptjs =    require('bcryptjs');
const {email} = require('../keys');
var nodemailer = require('nodemailer');
const userSession = require('../models/session');
const utilModel = require('../utilsModels/modelUtil');
const helpers ={};
helpers.encryptPassword= async (password)=>{
  const salt = await bcryptjs.genSalt(10);
  return await bcryptjs.hash(password, salt);
};

helpers.matchPassword =async(password,savedPassword)=>{
  try {
    return await bcryptjs.compare(password, savedPassword);
  } catch (e) {
    console.log(e)
  }
};
helpers.validateAccesousUsuario =async(req, res)=>{
};

helpers.setEmail =(mailOptions)=>{
  console.log(mailOptions);
const transporter  = nodemailer.createTransport(email);
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
};

helpers.setFunctions = (user) =>{
    for(var key in userSession){
      user[key] = userSession[key];
    }
    return user;
};

helpers.setFunctionsModels = (e) =>{
  for(var key in utilModel){
    e[key] = utilModel[key];
  }
  return e;
};

module.exports = helpers;