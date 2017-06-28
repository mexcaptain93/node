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

pbAPIv1.get('/person', (req, result) => {
	MongoClient.connect(url, (err, db) => {
		if (err) {
			console.log('Невозможно подключиться к серверу MongoDB. Ошибка:', err);
		} else {
			let collection = db.collection('people');
			collection.find({}).toArray((err, res) =>  {
				result.send(res);
			});
		}
		db.close();
	});
});

pbAPIv1.get('/person/:id', (req, result) => {
	const id = new ObjectId(req.params.id);

	MongoClient.connect(url, (err, db) => {
		if (err) {
			console.log('Невозможно подключиться к серверу MongoDB. Ошибка:', err);
		} else {
			let collection = db.collection('people');
			collection.find({'_id': id}).toArray((err, res) =>  {
				res.forEach((person) => {
					result.send(person);
				});
			});
		}
		db.close();
	});
});

pbAPIv1.post('/person', (req, result) => {
	const name = req.body.name;
	const lastname = req.body.lastname;
	const phone = req.body.phone;
	const person = {
		name: name,
		lastname: lastname,
		phone: phone
	};

	MongoClient.connect(url, (err, db) => {
		if (err) {
			console.log('Невозможно подключиться к серверу MongoDB. Ошибка:', err);
		} else {
			let collection = db.collection('people');
			collection.insert(person, (err, res) => {
				if (err) {
					console.log('Ошибка:', err);
				} else {
					result.send('Person added!');
					result.end();
				}
				db.close();
			});
		}
	});
});

pbAPIv1.put('/person/:id', (req, result) => {
	const id = new ObjectId(req.params.id);
	const name = req.body.name;
	const lastname = req.body.lastname;
	const phone = req.body.phone;

	MongoClient.connect(url, (err, db) => {
		if (err) {
			console.log('Невозможно подключиться к серверу MongoDB. Ошибка:', err);
		} else {
			let collection = db.collection('people');
			collection.update({'_id': id}, {$set: {'name': name, 'lastname': lastname, 'phone': phone}});
			result.send('ok');
			result.end();
			db.close();
		}
	});
});

pbAPIv1.delete('/person/:id', (req, result) => {
	const id = new ObjectId(req.params.id);

	MongoClient.connect(url, (err, db) => {
		if (err) {
			console.log('Невозможно подключиться к серверу MongoDB. Ошибка:', err);
		} else {
			let collection = db.collection('people');
			collection.remove({'_id': id});
			result.send('deleted');
			result.end();
			db.close();
		}
	});
});

pbAPIv1.get('/search', (req, result) => {
	const q = req.query.q;

	MongoClient.connect(url, (err, db) => {
		if (err) {
			console.log('Невозможно подключиться к серверу MongoDB. Ошибка:', err);
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
})
