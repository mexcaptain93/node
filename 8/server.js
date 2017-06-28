var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017/phonebook';



server.listen(port, function () {
	console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname + '/html'));


io.on('connection', function (socket) {
	MongoClient.connect(url, (err, db) => {
		if (err) {
			console.log('Невозможно подключиться к серверу MongoDB. Ошибка:', err );
		} else {
			let collection = db.collection('people');
			collection.find({}).toArray((err, res) =>  {
				socket.emit('start', {
					people: res
				});
			});

		}
	})

});