const express =    require('express');
const morgan =    require('morgan');
const expresshbs =  require('express-handlebars');
const path =    require('path');
const flash=require('connect-flash');
const session =    require('express-session');
const mysqlStore=    require('express-mysql-session');
const {database,errorpage} =    require('./keys');
const passport =    require('passport');
//Initizations
const app =    express();
require('./lib/passport');
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
//Middlewares -> Se ejecuta en cada peticion al servidor
app.use(session({
    secret:'fatzmysqlnodesession',
    resave:false,
    saveUninitialized:false,
    store: new mysqlStore(database)
}));
app.use(flash());//Enviar mensajes
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
//Global Variables
app.use((req, res, next)=>{
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user    =req.user;
    next();
});
//Routes
app.use(require('./routes/login'));
app.use('/biblioteca/index', require('./routes/index'));
app.use('/biblioteca/pagina', require('./routes/pagina'));
app.use('/biblioteca/administrador', require('./routes/administrador'));
app.use('/biblioteca/autor', require('./routes/autor'));
app.use('/biblioteca/editorial', require('./routes/editorial'));
app.use('/biblioteca/categoria', require('./routes/categoria'));
app.use('/biblioteca/libro', require('./routes/libro'));
app.use('/biblioteca/alumno', require('./routes/alumno'));
app.use('/biblioteca/prestamos', require('./routes/prestamoLibro'));
app.use(require('./routes/authentication'));
//Public
app.use(express.static(path.join(__dirname, 'public')));
//Startin server
app.listen(app.get('port'),()=>{
    console.log('Server on por', app.get('port'));
});
