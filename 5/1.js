function getMaxId(list) {
	const arr = list.map(p => p.id);
	if (!arr.length) return 0;
	return Math.max.apply(null, arr);
}

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let users = [
	{id:1, name:'Mikhail', score:100},
	{id:2, name:'Ivan', score:50}
];

const rtAPIv1 = express.Router();

// Get all users.
rtAPIv1.get('/users/', (req, res) => {
	if (users.length > 0) {
		res.status(200).send(users);
	} else {
		res.status(200).send('Users is empty')
	}
});

// Get user by id.
rtAPIv1.get('/users/:id', (req, res) => {
	let ans = users.filter((user) => {
		return (user.id === req.params.id);
	});
	if (ans.length > 0) {
		res.status(200).send(ans);
	} else {
		res.status(404).send(`User (id: ${req.params.id}) not found`);
	}
});

// Add user
rtAPIv1.post('/users/', (req, res) => {
	let name = req.body.name;
	let score = req.body.score;
	if (!name || !score) {
		res.status(400).send('No user data');
		return;
	}
	let id = getMaxId(users) + 1;
	users.push({'id':id, 'name':name, 'score':score});
	res.status(200).send('added ' + name);
});

// Edit user by id
rtAPIv1.put('/users/:id', (req, res) => {
	let editUser = false;
	for (let i=0; i<users.length; i++) {
		if (users[i].id == req.params.id) {
			editUser = true;
			if (req.body.name) {
				users[i].name = req.body.name;
			}
			if (req.body.score) {
				users[i].score = req.body.score;
			}
			break;
		}
	}
	if (editUser) {
		res.status(200).send(users[req.params.id]);
	}
	else {
		res.status(404).send(`User (id: ${req.params.id}) not found`);
	}
});

// Delete user by id
rtAPIv1.delete('/users/:id', (req, res) => {
	let deleteUser = false;
	for (let i=0; i<users.length; i++) {
		if (users[i].id == req.params.id) {
			deleteUser = true;
			users.splice(i, 1);
			break;
		}
	}
	if (deleteUser) {
		res.status(200).send('Deleted');
	}
	else {
		res.status(404).send(`User (id: ${req.params.id}) not found`);
	}
});

app.use('/api/v1', rtAPIv1);


app.listen(1337);