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

	var app = __webpack_require__(1);
	var debug = __webpack_require__(11)('myapp:server');
	var http = __webpack_require__(12);
	var models = __webpack_require__(13);
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
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {var express = __webpack_require__(2);
	var path = __webpack_require__(3);
	var favicon = __webpack_require__(4);
	var logger = __webpack_require__(5);
	var cookieParser = __webpack_require__(6);
	var bodyParser = __webpack_require__(7);

	var routes = __webpack_require__(8);
	var users = __webpack_require__(9);

	var app = express();

	// load .env file
	if(app.get('env') === 'development') {
	  __webpack_require__(10).config({path: '.env.dev'});
	} else {
	  __webpack_require__(10).config();
	}

	// view engine setup
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'jade');

	// uncomment after placing your favicon in /public
	//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, 'public')));

	app.use('/', routes);
	app.use('/users', users);

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

	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("serve-favicon");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("cookie-parser");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var express = __webpack_require__(2);
	var router = express.Router();

	/* GET home page. */
	router.get('/', function(req, res, next) {
	  res.render('index', { title: 'Express' });
	});

	module.exports = router;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var express = __webpack_require__(2);
	var router = express.Router();

	/* GET users listing. */
	router.get('/', function(req, res, next) {
	  res.send('respond with a resource');
	});

	module.exports = router;


/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("dotenv");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("debug");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module, __dirname) {'use strict';

	var fs        = __webpack_require__(15);
	var path      = __webpack_require__(3);
	var Sequelize = __webpack_require__(16);
	var basename  = path.basename(module.filename);
	var db        = {};

	var sequelize = new Sequelize(process.env.DB_DATABASE,
	                              process.env.DB_USER,
	                              process.env.DB_PASS,
	                              {host: process.env.DB_HOST});


	fs
	  .readdirSync(__dirname)
	  .filter(function(file) {
	    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
	  })
	  .forEach(function(file) {
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

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)(module), "/"))

/***/ },
/* 14 */
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
/* 15 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("sequelize");

/***/ }
/******/ ]);