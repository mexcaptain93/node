const http = require('http');
const port = 3000;

function getHash(data) {
	const options = {
		host: 'netology.tomilomark.ru',
		path: '/api/v1/hash',
		method: 'POST',
		headers: {'Content-Type': 'application/json'}
	};

	function process(remoteData) {
		data = JSON.parse(data);
		remoteData = JSON.parse(remoteData);
		const ans = {
			firstName: data.Firstname,
			lastName: data.lastName,
			secretKey: remoteData.hash
		};
		console.log(ans); // Finish result
	}
	function remoteHandler(response) {
		let remoteData = '';
		response.on('data', function(chunk) {
			remoteData += chunk;
		});
		response.on('end', function() {
			process(remoteData);
		});
	}

	const remoteRequest = http.request(options, remoteHandler);
	remoteRequest.write(data);
	remoteRequest.on('error', (err) => {console.log(err)});
	remoteRequest.end();
}


function handler(req, res) {
	let data = '';
	req.on('data', chunk => data += chunk);
	req.on('end', () => {
		res.writeHead(200, 'OK', {'Content-Type': 'text/plain'});
		getHash(data);
		res.write(data);
		res.end();
	});
}
const server = http.createServer();
server.on('error', err => console.error(err));
server.on('request', handler);
server.on('listening', () => {
	console.log('Start HTTP on port %d', port);
});
server.listen(port);
