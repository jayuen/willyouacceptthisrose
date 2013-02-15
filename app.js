"use strict";

global.host = "http://localhost:3000";

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var restrict = require('./auth').restrict;
var passport = require('./auth').passport;
var authenticate = require('./auth').authenticate;

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'hjs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('e602f9fa-38a0-4bda-8309-508608f71053'));
  app.use(express.session());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', restrict, routes.index);
app.get('/login', authenticate);
app.get('/login/return', authenticate);
app.get('/login/fail', routes.failedLogin);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
