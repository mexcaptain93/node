const http = require('http');

const person = {
	'Firstname': 'Mikhail',
	'lastName': 'Golovanov'
};

var options = {
	host: 'localhost',
	port: 3000,
	method: 'POST',
	headers: {'Content-Type': 'application/json'}
};

function process(data) {
	// data = JSON.parse(data);
	// const ans = {
	// 	firstName: person.Firstname,
	// 	lastName: person.lastName,
	// 	secretKey: data.hash
	// };
	console.log(JSON.parse(data));
}
function handler(response) {
	let data = '';
	response.on('data', function(chunk) {
		data += chunk;
	});
	response.on('end', function() {
		process(data);
	});
}

const request = http.request(options, handler);
request.write(JSON.stringify(person));
request.on('error', (err) => {console.log(err)});
request.end();