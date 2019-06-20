const express =    require('express');
const morgan =    require('morgan');
const expresshbs =  require('express-handlebars');
const path =    require('path');
const flash=require('connect-flash');
const session =    require('express-session');
const mysqlStore=    require('express-mysql-session');
const {database,errorpage} =    require('./keys');
/* const passport =    require('passport'); */
//Initizations
const app =    express();
//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.engine('.hbs',expresshbs({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'), '/layouts'),
    partialsDir:path.join(app.get('views'), '/partials'),
    extname:'.hbs',
    helpers:require('./lib/handlebars')
}));
app.set('view engine','.hbs');

app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Global Variables
app.use((req, res, next)=>{
/*     app.locals.success = req.flash('success');
    app.locals.message = req.flash('message'); */
    app.locals.user    =req.user;
    next();
});
//Routes
app.use(require('./routes/login'));
//Public
app.use(express.static(path.join(__dirname, 'public')));
//Startin server
app.listen(app.get('port'),()=>{
    console.log('Server on por', app.get('port'));
});
