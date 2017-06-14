const express = require("express");
const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let users = [
	{"id":1,"name":"Mikhail","score":100},
	{"id":2,"name":"Ivan","score":50}
]

const rtAPIv1 = express.Router();

// Get all users.
rtAPIv1.get("/users/", function(req, res) {
	if (users.length > 0) {
		res.send(users);
	}
	else {
		res.send('Users is empty')
	}
});

// Get user by id.
rtAPIv1.get("/users/:id", function(req, res) {
	let ans = users.filter(function(user) {
		return (user.id == req.params.id);
	});
	if (ans.length > 0) {
		res.send(ans)
	}
	else {
		res.send('User (id: ' + req.params.id + ') not found')
	}
});

// Add user
rtAPIv1.post("/users/", function(req, res) {
	let name = req.body.name;
	let score = req.body.score;
	let id = 0;
	for (var i=0 ; i<users.length ; i++) {
		if (users[i].id > id) {
			id = users[i].id
		}
	}
	id++;
	users.push({'id':id, 'name':name, 'score':score});
	res.send('added ' + name);
});

// Edit user by id
rtAPIv1.put("/users/:id", function(req, res) {
	let editUser = false;
	for (let i=0; i<users.length; i++) {
		if (users[i].id == req.params.id) {
			editUser = true;
			if (req.body.name && req.body.name != '') {
				users[i].name = req.body.name;
			}
			if (req.body.score && req.body.score != '') {
				users[i].score = req.body.score;
			}
			break;
		}
	}
	if (editUser) {
		res.send(users[req.params.id]);
	}
	else {
		res.send('User (id: ' + req.params.id + ') not found')
	}
});

// Delete user by id
rtAPIv1.delete('/users/:id', function(req, res) {
	let deleteUser = false;
	for (let i=0; i<users.length; i++) {
		if (users[i].id == req.params.id) {
			deleteUser = true;
			users.splice(i, 1);
			break;
		}
	}
	if (deleteUser) {
		res.end('Deleted');
	}
	else {
		res.send('User (id: ' + req.params.id + ') not found')
	}
});

app.get("/", function(req, res) {
	res.send("Hello World1!");
});

app.use("/api/v1", rtAPIv1);


app.listen(1337);