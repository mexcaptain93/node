const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
	let addedUser;

	socket.on('add user', (username) => {
		if (addedUser) return;

		socket.username = username;
		addedUser = true;

		socket.broadcast.emit('user joined', {
			username: socket.username,
		});

	});

	socket.on('send message', (data) => {
		if (data) {
			io.sockets.emit('add message', data);
		}
	});

});


server.listen(port, function () {
	console.log('Server listening at port %d', port);
});