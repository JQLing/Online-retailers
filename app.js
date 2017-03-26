var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var multer = require('multer');
var session = require('express-session');
var mongoose = require('mongoose');

var routes = require('./routes/index');
//routes(app);

global.dbHelper = require( './common/dbHelper');
global.db = mongoose.connect("mongodb://localhost/ds");
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.engine('.html',require('ejs').__express);


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//Handel File Uploads
app.use(multer({dest:'./uploads/'}).array('multiInputFileName'));

//Handle Express Sessions
app.use(session({
	secret: 'what do you want to do',
	cookie:{
		maxAge: 31*60*60*24
	}
}));
//传递信息
app.use(function(req,res,next){
	res.locals.user = req.session.user; //保存用户信息
	var err = req.session.error; //保存结果响应信息
	res.locals.message = ''; //保存html标签
	if(err){
		res.locals.message= '<div style="margin-bottom: 20px;color:red;">' + err + '</div>';
	}
	next();
});

routes(app);

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