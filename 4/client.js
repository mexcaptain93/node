const http = require('http');

const person = {
	'Firstname': 'Mikhail',
	'lastName': 'Golovanov'
};

var options = {
	host: 'netology.tomilomark.ru',
	path: '/api/v1/hash',
	method: 'POST',
	headers: {'Content-Type': 'application/json'}
};

function process(data) {
	data = JSON.parse(data);
	const ans = {
		firstName: person.Firstname,
		lastName: person.lastName,
		secretKey: data.hash
	};
	console.log(ans);
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