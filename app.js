const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


////////////////////////////////////////////////////////////////////run mongoDB connection
const mongooseDB = require('mongoose');
const db  = require('./config/db');
mongooseDB.Promise = global.Promise;
mongooseDB.connect(db.url, db.options, function (err) {
    if (err) {console.log(err);}
});
///////////////////////////////////////////////////////////////////////////session
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const sessionMiddleware = session({
    secret: 'elena20',
    store: new MongoStore({mongooseConnection: mongooseDB.connection}),
    resave: true,
    saveUninitialized: true,
    useUnifiedTopology: true
});

////////////////////////////////////////////////////////////////////////////////////////

const worksRouter = require('./routes/works');
const messageRouterGET = require('./routes/messageGET');
const messageRouterPOST = require('./routes/messagePOST');
const messageRouterDELETE = require('./routes/messageDELETE');

const mappingRouterGET = require('./routes/mappingGET');
const mappingRouterPOST = require('./routes/mappingPOST');
const app = express();
app.use(sessionMiddleware);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/works', worksRouter);
app.use('/message/get', messageRouterGET);
app.use('/message/post', messageRouterPOST);
app.use('/message/delete', messageRouterDELETE);

app.use('/mapping/get', mappingRouterGET);
app.use('/mapping/post', mappingRouterPOST);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
