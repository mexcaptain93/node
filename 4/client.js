const http = require('http');

const person = {
	'Firstname': 'Mikhail',
	'lastName': 'Golovanov'
};

const options = {
	host: 'localhost',
	port: 3000,
	method: 'POST',
	headers: {'Content-Type': 'application/json'}
};

function handler(response) {
	let data = '';
	response.on('data', (chunk) => {
		data += chunk;
	});
	response.on('end', () => {
		console.log(JSON.parse(data));
	});
}

const request = http.request(options, handler);
request.write(JSON.stringify(person));
request.on('error', (err) => {console.log(err)});
request.end();