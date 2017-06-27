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

function process(data) {
	console.log(JSON.parse(data));
}
function handler(response) {
	let data = '';
	response.on('data', (chunk) => {
		data += chunk;
	});
	response.on('end', () => {
		process(data);
	});
}

const request = http.request(options, handler);
request.write(JSON.stringify(person));
request.on('error', (err) => {console.log(err)});
request.end();