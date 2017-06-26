const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.get('/hello', (req, res) => {
	res.send('Hello, stranger');
});

app.get('/hello/:name', (req, res) => {
	res.send('Hello, ' + req.params.name);
});

app.all('/sub/*', (req, res) => {
	let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
	res.send(fullUrl);
});

app.post('/post/',
	(req, res, next) => {
		if (req.headers.key) {
			res.status(401).send('There is key!');
		} else {
			next();
		}
	},
	(req, res) => {
	if (Object.keys(req.body).length == 0) {
		res.status(404).send('Not found');
	} else {
		res.json(req.body);
	}
});

app.listen(3000, () => {
	console.log('Example app listening on port 3000!');
});