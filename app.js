"use strict";

global.host = "http://localhost:3000";

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , picks = require('./routes/picks')
  , results = require('./routes/results')
  , http = require('http')
  , path = require('path');
  , restrict = require('./auth').restrict;
  , passport = require('./auth').passport;
  , authenticate = require('./auth').authenticate;

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'hbs');
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

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/edit_my_picks', picks.edit.bind(picks));
app.get('/enter_results', results.enter.bind(results));
app.post('/enter_results', results.submit.bind(results));
app.get('/login', authenticate);
app.get('/login/return', authenticate);
app.get('/login/fail', routes.failedLogin);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
