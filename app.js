//dependencies
var http = require('http');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var indexRoute = require('./routes/index');
var dbRoutes = require('./routes/router');
var express = require('express');

//server setup
var app = express();

app.use(express.static(path.join(__dirname,'public')));
app.use('/node_modules/', express.static(__dirname + '/node_modules/'));
app.use('/templates/', express.static(__dirname + '/views/templates/'));
app.use('/data/', express.static(__dirname + '/data/'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('views', path.join(__dirname, "views"));
app.set('port', process.env.PORT || 3000);

var server = http.createServer(app);
var io = require('socket.io').listen(server);
server.listen(app.get('port'));

//routing
app.use('/', indexRoute);
app.use('/api', dbRoutes);

/* Handle 404. */
app.use(function(req, res, next) {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

//io listeners
io.set("origins", "*:*");
 
io.on('connection', function (socket) {

	//test
	socket.on('alert', function (data){
		console.log(data);	
	});

	//chat listener
	socket.on('newMessage', function (data) {
		io.emit('chatUpdate',data);
	});

	//user listener
	socket.on('connectedToChat', function (data) {
		socket.uid = data.id;
		socket.name = data.name;
		io.emit('updateUserList');
		socket.emit('chatUpdate',
			{'userName':'','text':'You have entered the room'});
		socket.broadcast.emit('chatUpdate',
			{'userName':'','text':socket.name+' has entered the room'});
	});

	//disconnect and remove user
	socket.on('disconnect', function(){
		if ( socket.uid !== undefined && socket.uid !== null ) {
			socket.broadcast.emit('chatUpdate',
				{'userName':'','text':socket.name+' has left the room'});
			socket.broadcast.emit('deleteUser', socket.uid);
			io.emit('updateUserList');
		}
	});
});

module.exports = app;
