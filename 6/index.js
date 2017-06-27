const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

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
			next();
		} else {
			res.status(401).send('There is key!');
		}
	},
	(req, res) => {
	if (Object.keys(req.body).length == 0) {
		res.status(401).send('Not found');
	} else {
		res.json(req.body);
	}
});

app.listen(port, () => {
	console.log(`Listening to ${port} port`);
});