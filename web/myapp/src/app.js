var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
let session = require('express-session');
let passport = require('passport')

var routes = require('./routes/index');
var user = require('./routes/user');
let event = require('./routes/event');
let api = require('./routes/api')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.disable('view cache')

// Set secret key for jwt
app.set('jwtKey', process.env.JWT_KEY)

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb',
  parameterLimit: 1000000
}));
app.use(cookieParser());
app.use(session({
  secret: 'VaU3O0HQWZ8F8o1enbue',
  resave: false,
  saveUninitialized: false
})); // session middleware
app.use(require('flash')());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../public')));
app.use(passport.initialize())  
app.use(passport.session())  

app.use('*', (req, res, next) => {
  res.append('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.append('Access-Control-Allow-Credentials', true)
  res.append('Access-Control-Allow-Methods', 'DELETE, GET, POST, PUT')
  next()
})

app.use('/', routes);
app.use('/user', user);
app.use('/event', event);
app.use('/api', api)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;