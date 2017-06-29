const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const tasksAPIv1 = express.Router();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = require('mongodb').ObjectID;


let userSchema = new Schema({
	name: String
});

const taskSchema = new Schema({
	name: String,
	description: String,
	closed: Boolean,
	user: mongoose.Schema.Types.ObjectId
});

tasksAPIv1.get('/', (req, res) => {
	res.send('Tasks index!');
});

// Users.

tasksAPIv1.get('/users', (req, result) => {
	mongoose.connect('mongodb://localhost:27017/tasks', { useMongoClient: true });
	const db = mongoose.connection;

	db.on('error', console.error.bind(console, 'conncetion error:'));
	db.once('open', () => {
		let users = db.collection('users');
		let User = mongoose.model('User', userSchema);

		User.find((err, res) => {
			if (err) {
				console.log(err);
				result.end();
			} else {
				result.send(res);
				result.end();
			}
		});
	});
});

tasksAPIv1.get('/users/:id', (req, result) => {
	const id = new ObjectId(req.params.id);

	mongoose.connect('mongodb://localhost:27017/tasks', { useMongoClient: true });
	const db = mongoose.connection;

	db.on('error', console.error.bind(console, 'conncetion error:'));
	db.once('open', () => {
		let users = db.collection('users');
		let User = mongoose.model('User', userSchema);

		User.find({'_id': id}, (err, res) => {
			if (err) {
				console.log(err);
				result.end();
			} else {
				result.send(res);
				result.end();
			}
		});
	});
});

tasksAPIv1.post('/users', (req, result) => {
	mongoose.connect('mongodb://localhost:27017/tasks', { useMongoClient: true });
	const db = mongoose.connection;

	db.on('error', console.error.bind(console, 'conncetion error:'));
	db.once('open', () => {
		let users = db.collection('users');
		let User = mongoose.model('User', userSchema);

		let u = new User({name: req.body.name});
		u.save();

		users.insert(u, (err, res) => {
			if (err) {
				console.log(err);
				db.close();
				result.end();
			} else {
				result.send('User ' + u.name + ' added');
				db.close();
				result.end();
			}
		});
	});
});

tasksAPIv1.put('/users/:id', (req, result) => {
	const id = new ObjectId(req.params.id);
	const name = req.body.name;

	mongoose.connect('mongodb://localhost:27017/tasks', { useMongoClient: true });
	const db = mongoose.connection;

	db.on('error', console.error.bind(console, 'conncetion error:'));
	db.once('open', () => {
		let users = db.collection('users');
		let User = mongoose.model('User', userSchema);

		User.update({ _id: id }, { $set: { name: name }}, (err, res) => {
			if (err) {
				console.log(err);
				result.end();
			} else {
				result.send('Updated');
				result.end();
			}
		});
	});
});

tasksAPIv1.delete('/users/:id', (req, result) => {
	const id = new ObjectId(req.params.id);

	mongoose.connect('mongodb://localhost:27017/tasks', { useMongoClient: true });
	const db = mongoose.connection;

	db.on('error', console.error.bind(console, 'conncetion error:'));
	db.once('open', () => {
		let users = db.collection('users');
		let User = mongoose.model('User', userSchema);

		User.remove({ _id: id }, (err, res) => {
			if (err) {
				console.log(err);
				result.end();
			} else {
				result.send('Deleted');
				result.end();
			}
		});
	});
});


// Tasks

tasksAPIv1.get('/tasks', (req, result) => {
	mongoose.connect('mongodb://localhost:27017/tasks', { useMongoClient: true });
	const db = mongoose.connection;

	db.on('error', console.error.bind(console, 'conncetion error:'));
	db.once('open', () => {
		let tasks = db.collection('tasks');
		let Task = mongoose.model('Task', taskSchema);

		Task.find((err, res) => {
			if (err) {
				console.log(err);
				result.end();
			} else {
				result.send(res);
				result.end();
			}
		});
	});
});

tasksAPIv1.get('/tasks/:id', (req, result) => {
	const id = new ObjectId(req.params.id);

	mongoose.connect('mongodb://localhost:27017/tasks', { useMongoClient: true });
	const db = mongoose.connection;

	db.on('error', console.error.bind(console, 'conncetion error:'));
	db.once('open', () => {
		let tasks = db.collection('tasks');
		let Task = mongoose.model('Task', taskSchema);

		Task.find({'_id': id}, (err, res) => {
			if (err) {
				console.log(err);
				result.end();
			} else {
				result.send(res);
				result.end();
			}
		});
	});
});

tasksAPIv1.post('/tasks', (req, result) => {
	const data = {
		name: req.body.name,
		description: req.body.description,
		closed: req.body.description,
		user: new ObjectId(req.body.userId)
	};

	mongoose.connect('mongodb://localhost:27017/tasks', { useMongoClient: true });
	const db = mongoose.connection;

	db.on('error', console.error.bind(console, 'conncetion error:'));
	db.once('open', () => {
		let tasks = db.collection('tasks');
		let Task = mongoose.model('Task', taskSchema);

		let t = new Task(data);
		t.save();

		tasks.insert(t, (err, res) => {
			if (err) {
				console.log(err);
				db.close();
				result.end();
			} else {
				result.send(t);
				db.close();
				result.end();
			}
		});
	});
});

tasksAPIv1.put('/tasks/:id', (req, result) => {
	const id = new ObjectId(req.params.id);
	const data = {
		name: req.body.name,
		description: req.body.description,
		closed: req.body.description,
		user: new ObjectId(req.body.userId)
	};

	mongoose.connect('mongodb://localhost:27017/tasks', { useMongoClient: true });
	const db = mongoose.connection;

	db.on('error', console.error.bind(console, 'conncetion error:'));
	db.once('open', () => {
		let tasks = db.collection('tasks');
		let Task = mongoose.model('Task', taskSchema);

		Task.update({ _id: id }, { $set: data }, (err, res) => {
			if (err) {
				console.log(err);
				result.end();
			} else {
				result.send('Updated');
				result.end();
			}
		});
	});
});

tasksAPIv1.delete('/tasks/:id', (req, result) => {
	const id = new ObjectId(req.params.id);

	mongoose.connect('mongodb://localhost:27017/tasks', { useMongoClient: true });
	const db = mongoose.connection;

	db.on('error', console.error.bind(console, 'conncetion error:'));
	db.once('open', () => {
		let tasks = db.collection('tasks');
		let Task = mongoose.model('Task', taskSchema);

		Task.remove({ _id: id }, (err, res) => {
			if (err) {
				console.log(err);
				result.end();
			} else {
				result.send('Deleted');
				result.end();
			}
		});

	});
});

// Tasks open/close

tasksAPIv1.put('/tasks/open/:id', (req, result) => {
	const id = new ObjectId(req.params.id);

	mongoose.connect('mongodb://localhost:27017/tasks', { useMongoClient: true });
	const db = mongoose.connection;

	db.on('error', console.error.bind(console, 'conncetion error:'));
	db.once('open', () => {
		let tasks = db.collection('tasks');
		let Task = mongoose.model('Task', taskSchema);

		Task.update({ _id: id }, { $set: { closed: false } }, (err, res) => {
			if (err) {
				console.log(err);
				result.end();
			} else {
				result.send('Updated');
				result.end();
			}
		});
	});
});

tasksAPIv1.put('/tasks/close/:id', (req, result) => {
	const id = new ObjectId(req.params.id);

	mongoose.connect('mongodb://localhost:27017/tasks', { useMongoClient: true });
	const db = mongoose.connection;

	db.on('error', console.error.bind(console, 'conncetion error:'));
	db.once('open', () => {
		let tasks = db.collection('tasks');
		let Task = mongoose.model('Task', taskSchema);

		Task.update({ _id: id }, { $set: { closed: true } }, (err, res) => {
			if (err) {
				console.log(err);
				result.end();
			} else {
				result.send('Updated');
				result.end();
			}
		});
	});
});

// Tasks delegate

tasksAPIv1.put('/tasks/delegate/:id', (req, result) => {
	const id = new ObjectId(req.params.id);

	mongoose.connect('mongodb://localhost:27017/tasks', { useMongoClient: true });
	const db = mongoose.connection;

	db.on('error', console.error.bind(console, 'conncetion error:'));
	db.once('open', () => {
		let tasks = db.collection('tasks');
		let Task = mongoose.model('Task', taskSchema);

		Task.update({ _id: id }, { $set: { user: new ObjectId(req.body.userId) } }, (err, res) => {
			if (err) {
				console.log(err);
				result.end();
			} else {
				result.send('Updated');
				result.end();
			}
		});
	});
});


// Search

tasksAPIv1.get('/search', (req, result) => {
	const q = req.query.q;

	mongoose.connect('mongodb://localhost:27017/tasks', { useMongoClient: true });
	const db = mongoose.connection;

	db.on('error', console.error.bind(console, 'conncetion error:'));
	db.once('open', () => {
		let tasks = db.collection('tasks');
		let Task = mongoose.model('Task', taskSchema);

		Task.find({ $or: [{name: q}, {description: q}] }, (err, res) => {
			if (err) {
				console.log(err);
				result.end();
			} else {
				result.send(res);
				result.end();
			}
		});
	});
});


app.use('/api/v1', tasksAPIv1);

app.listen(port, () => {
	console.log(`Server listening at port ${port}`);
});
