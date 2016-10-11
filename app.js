//dependencies
var http = require('http');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var express = require('express');

//server setup
var app = express();
app.use(express.static(path.join(__dirname,'public')));
app.use('/node_modules/', express.static(__dirname + '/node_modules/'));
app.use('/templates/', express.static(__dirname + '/views/templates/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('views', path.join(__dirname, "views"));
app.set('port', process.env.PORT || 3000);

var server = http.createServer(app);
var io = require('socket.io').listen(server);
server.listen(app.get('port'));

//var io = socket.listen(server);

//routing
app.use('/', routes);

/* Handle 404. */
app.use(function(req, res, next) {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

//io listeners
io.set("origins", "*:*");
 
io.on('connection', function (socket) {
	console.log('user has connected'); 
	socket.on('alert', function (data){
		console.log(data);	
	});
	socket.on('newMessage', function (data) {
		socket.emit('chatUpdate',data);
		socket.broadcast.emit('chatUpdate',data);
	});
	socket.on('newUser', function (data) {
		socket.emit('chatUpdate',
			{'userName':'','text':data+' has entered the room'});
		socket.broadcast.emit('chatUpdate',
			{'userName':'','text':data+' has entered the room'});
	});
});

module.exports = app;
