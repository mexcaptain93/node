const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017/testBase';

const names = [
	{name:'Vasya'},
	{name:'Masha'},
	{name:'Petr'},
	{name:'Sasha'},
];


MongoClient.connect(url, (err, db) => {
	if (err) {
		console.log('Невозможно подключиться к серверу MongoDB. Ошибка:', err );
	} else {
		console.log('Соединение установлено для ', url);

		let collection = db.collection('names');
		collection.insert(names, (err, res) => {
			if (err) {
				console.log('Ошибка:', err);
			} else {
				console.log('Добавлено записей: ' + res.insertedCount);
				res.ops.forEach((name) => {
					console.log(name.name);
				})
			}
			db.close();
		});

		collection.updateMany({'name': 'Vasya'}, {$set: {'name': 'Viktor'}});
		collection.update({'name': 'Masha'}, {$set: {'name': 'Katya'}}, {multi:true});

		collection.find({}).toArray((err, res) =>  {
			console.log('Updated list:');
			res.forEach((name) => {
				console.log(name.name);
			})
		});


		collection.remove({'name': 'Viktor'});
		collection.remove({'name': 'Katya'});

		collection.find({}).toArray((err, res) =>  {
			console.log('After removing:');
			res.forEach((name) => {
				console.log(name.name);
			})
		});

	}
});