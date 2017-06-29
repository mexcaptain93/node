const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const pbAPIv1 = express.Router();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017/phonebook';
const ObjectId = require('mongodb').ObjectID;

pbAPIv1.get('/', (req, res) => {
	res.send('Phonebook index!');
});

pbAPIv1.get('/persons', (req, result) => {
	MongoClient.connect(url, (err, db) => {
		if (err) {
			result.send('Невозможно подключиться к серверу MongoDB. Ошибка:', err);
		} else {
			let collection = db.collection('people');
			collection.find({}).toArray((err, res) =>  {
				result.send(res);
			});
		}
		db.close();
	});
});

pbAPIv1.get('/persons/:id', (req, result) => {
	const id = new ObjectId(req.params.id);

	MongoClient.connect(url, (err, db) => {
		if (err) {
			result.send('Невозможно подключиться к серверу MongoDB. Ошибка:', err);
		} else {
			let collection = db.collection('people');
			collection.find({'_id': id}).toArray((err, res) =>  {
				if (res.length == 1) {
					result.send(res[0]);
				}
				else {
					result.status(404).send('Not found');
				}
			});
		}
		db.close();
	});
});

pbAPIv1.post('/persons', (req, result) => {
	const person = {
		name: req.body.name,
		lastname: req.body.lastname,
		phone: req.body.phone
	};

	MongoClient.connect(url, (err, db) => {
		if (err) {
			result.send('Невозможно подключиться к серверу MongoDB. Ошибка:', err);
		} else {
			let collection = db.collection('people');
			collection.insert(person, (err, res) => {
				if (err) {
					result.send('Ошибка:', err);
				} else {
					result.send('Person added!');
				}
				db.close();
			});
		}
	});
});

pbAPIv1.put('/persons/:id', (req, result) => {
	const id = new ObjectId(req.params.id);

	const data = {
		name: req.body.name,
		lastname: req.body.lastname,
		phone: req.body.phone
	}

	MongoClient.connect(url, (err, db) => {
		if (err) {
			result.send('Невозможно подключиться к серверу MongoDB. Ошибка:', err);
		} else {
			let collection = db.collection('people');
			collection.update({'_id': id}, {$set: data});
			result.send('ok');
			db.close();
		}
	});
});

pbAPIv1.delete('/persons/:id', (req, result) => {
	const id = new ObjectId(req.params.id);

	MongoClient.connect(url, (err, db) => {
		if (err) {
			result.send('Невозможно подключиться к серверу MongoDB. Ошибка:', err);
		} else {
			let collection = db.collection('people');
			collection.remove({'_id': id});
			result.send('deleted');
			db.close();
		}
	});
});

pbAPIv1.get('/search', (req, result) => {
	const q = req.query.q;

	MongoClient.connect(url, (err, db) => {
		if (err) {
			result.send('Невозможно подключиться к серверу MongoDB. Ошибка:', err);
		} else {
			let collection = db.collection('people');
			collection.find({ $or: [{'name': q}, {'lastname': q}, {'phone': q}] }).toArray((err, res) =>  {
				result.send(res);
			});
		}
		db.close();
	});
});

app.use('/api/v1', pbAPIv1);

app.listen(port, () => {
	console.log(`Server listening at port ${port}`);
});
