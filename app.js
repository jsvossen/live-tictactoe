//dependencies
var http = require('http');
var path = require('path');
//var cookieParser = require('cookie-parser');
//var bodyParser = require('body-parser');
var routes = require('./routes/index');
var express = require('express');
var socket = require('socket.io');

//server setup
var app = express();
app.use(express.static(path.join(__dirname,'public')));
app.use('/node_modules/', express.static(__dirname + '/node_modules/'));
app.set('views', path.join(__dirname, "views"));
app.set('port', process.env.PORT || 3000);

var server = http.createServer(app);
server.listen(app.get('port'));

var io = socket.listen(server);

//routing
app.use('/', routes);

module.exports = app;
