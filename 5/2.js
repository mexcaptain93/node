function getMaxId(list) {
	const arr = list.map(p => p.id);
	if (!arr.length) return 1;
	return Math.max.apply(null, arr) + 1;
}

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const rtAPIv1 = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let users = [
	{id:1, name:'Mikhail', score:100},
	{id:2, name:'Ivan', score:50}
];

const RPC = {
	getUserList: (params, callback) => {
		callback(null, users);
	},
	getUserById: (params, callback) => {
		let ans = users.filter((user) => {
			return (user.id == params);
		}).pop();
		if (ans) {
			callback(null, ans)
		} else {
			callback(`User (id: ${params}) not found`, null);
		}
	},
	createUser: (params, callback) => {
		params = JSON.parse(params).pop();
		let name = params.name;
		let score = params.score;
		let id = getMaxId(users);
		users.push({'id':id, 'name':name, 'score':score});
		callback(null, users);
	},
	updateUser: (params, callback) => {
		params = JSON.parse(params).pop();
		let editUser = false;
		users = users.map((user) => {
			if (user.id == params.id) {
				editUser = true;
				if (params.name) {
					user.name = params.name;
				}
				if (params.score) {
					user.score = params.score;
				}
			}
			return user;
		});
		if (editUser) {
			callback(null, users);
		} else {
			callback('User is not found', null);
		}
	},
	deleteUser: (params, callback) => {
		let deleteUser = false;
		for (let i=0; i<users.length; i++) {
			if (users[i].id == params) {
				deleteUser = true;
				users.splice(i, 1);
				break;
			}
		}
		if (deleteUser) {
			callback(null, users);
		}
		else {
			callback('User is not found', null);
		}
	}
};

rtAPIv1.post('/rpc', (req, res) => {
	const method = RPC[req.body.method];

	method(req.body.params, (error, result) => {
		if (error) {
			res.status(404).json(error);
		} else {
			res.json(result);
		}
	});
	res.end();
});

app.use('/api/v1', rtAPIv1);

app.listen(1338);