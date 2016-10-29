/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */
	__webpack_require__(1).config();
	var app = __webpack_require__(2);
	var debug = __webpack_require__(21)('myapp:server');
	var http = __webpack_require__(22);
	var models = __webpack_require__(14);
	/**
	 * Get port from environment and store in Express.
	 */

	var port = normalizePort(process.env.PORT || '3000');
	app.set('port', port);

	/**
	 * Create HTTP server.
	 */

	var server = http.createServer(app);

	/**
	 * Listen on provided port, on all network interfaces.
	 */
	models.sequelize.sync().then(function () {
	  server.listen(port);
	  server.on('error', onError);
	  server.on('listening', onListening);
	});

	/**
	 * Normalize a port into a number, string, or false.
	 */

	function normalizePort(val) {
	  var port = parseInt(val, 10);

	  if (isNaN(port)) {
	    // named pipe
	    return val;
	  }

	  if (port >= 0) {
	    // port number
	    return port;
	  }

	  return false;
	}

	/**
	 * Event listener for HTTP server "error" event.
	 */

	function onError(error) {
	  if (error.syscall !== 'listen') {
	    throw error;
	  }

	  var bind = typeof port === 'string'
	    ? 'Pipe ' + port
	    : 'Port ' + port;

	  // handle specific listen errors with friendly messages
	  switch (error.code) {
	    case 'EACCES':
	      console.error(bind + ' requires elevated privileges');
	      process.exit(1);
	      break;
	    case 'EADDRINUSE':
	      console.error(bind + ' is already in use');
	      process.exit(1);
	      break;
	    default:
	      throw error;
	  }
	}

	/**
	 * Event listener for HTTP server "listening" event.
	 */

	function onListening() {
	  var addr = server.address();
	  var bind = typeof addr === 'string'
	    ? 'pipe ' + addr
	    : 'port ' + addr.port;
	  debug('Listening on ' + bind);
	}


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("dotenv");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var express = __webpack_require__(3);
	var path = __webpack_require__(4);
	var favicon = __webpack_require__(5);
	var logger = __webpack_require__(6);
	var cookieParser = __webpack_require__(7);
	var bodyParser = __webpack_require__(8);
	let session = __webpack_require__(9);
	let passport = __webpack_require__(10)

	var routes = __webpack_require__(11);
	var user = __webpack_require__(12);
	let event = __webpack_require__(19);

	var app = express();

	// view engine setup
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'pug');
	app.disable('view cache')
	console.log(path.join(__dirname, 'views'));
	// uncomment after placing your favicon in /public
	//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
	  extended: false
	}));
	app.use(cookieParser());
	app.use(session({
	  secret: 'VaU3O0HQWZ8F8o1enbue',
	  resave: false,
	  saveUninitialized: false
	})); // session middleware
	app.use(__webpack_require__(20)());
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(passport.initialize())  
	app.use(passport.session())  

	app.use('/', routes);
	app.use('/user', user);
	app.use('/event', event);
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

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("serve-favicon");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("cookie-parser");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("express-session");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("passport");

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var express = __webpack_require__(3);
	var router = express.Router();

	/* GET home page. */
	router.get('/', function(req, res, next) {
	  res.render('index', { title: 'Express' });
	});

	module.exports = router;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var express = __webpack_require__(3);
	var router = express.Router();
	let passport = __webpack_require__(10)
	let LocalStrategy = __webpack_require__(13).Strategy
	let models = __webpack_require__(14);

	router.get('/login', (req, res, next) => {
	  res.render('user/login.pug');
	})

	router.post('/login',
	  passport.authenticate('local', {
	    successRedirect: '/event',
	    failureRedirect: '/user/login',
	    failureFlash: true
	  })
	);

	router.get('/register', (req, res, next) => {

	});

	router.post('/register', (req, res, next) => {

	});

	passport.use(new LocalStrategy({
	    usernameField: 'email',
	    passwordField: 'password'
	  },
	  (email, password, done) => {
	    models.users.findOne({
	      where: {
	        email: email,
	      }
	    }).then((user) => {
	      if (user === null) {
	        return done(null, false, {
	          message: 'Error !?'
	        })
	      }

	      return done(null, user)
	    })
	  }
	));

	passport.serializeUser(function(user, done) {
	  done(null, user);
	});

	passport.deserializeUser(function(user, done) {
	  done(null, user);
	});

	module.exports = router;

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("passport-local");

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	var fs = __webpack_require__(16);
	var path = __webpack_require__(4);
	var Sequelize = __webpack_require__(17);
	var basename = path.basename(module.filename);
	var db = {};
	let users = __webpack_require__(18);
	var sequelize = new Sequelize(process.env.DB_DATABASE,
	  process.env.DB_USER,
	  process.env.DB_PASS, {
	    host: process.env.DB_HOST
	  });

	fs
	  .readdirSync(__dirname)
	  .filter(function(file) {
	    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
	  })
	  .forEach(function(file) {
	    // console.log(path.join(__dirname, file));
	    var model = sequelize['import'](path.join(__dirname, file));
	    db[model.name] = model;
	  });

	Object.keys(db).forEach(function(modelName) {
	  if (db[modelName].associate) {
	    db[modelName].associate(db);
	  }
	});

	db.sequelize = sequelize;
	db.Sequelize = Sequelize;

	module.exports = db;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)(module)))

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("sequelize");

/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";

	module.exports = (sequelize, DataTypes) => {
	  let users = sequelize.define('users', {
	    email: {
	      type: DataTypes.STRING(255),
	      unique: true
	    },
	    first_name: DataTypes.STRING(128),
	    last_name: DataTypes.STRING(128),
	    password: DataTypes.STRING(128),
	    role: DataTypes.INTEGER,
	    last_login: DataTypes.DATE
	  }, {
	    classMethods: {
	      associate: (models) => {
	        users.hasMany(models.events, {
	          as: 'Events'
	        })
	      }
	    },
	    underscored: true
	  });

	  return users
	}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	let express = __webpack_require__(3)
	let router = express.Router()
	let models = __webpack_require__(14)

	router.get('/', (req, res, next) => {
	    models.events.findAll({
	        where: {
	            user_id: req.user.id
	        }
	    }).then((events_data) => {
	        res.render('event/home', {events: events_data})
	    })
	})
	module.exports = router;

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = require("flash");

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = require("debug");

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ }
/******/ ]);