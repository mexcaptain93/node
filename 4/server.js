const http = require('http');
const port = 3000;

function getHash(data, res) {
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
		return ans;
	}
	function remoteHandler(response) {
		let remoteData = '';
		response.on('data', (chunk) => {
			remoteData += chunk;
		});
		response.on('end', () => {
			const answer = process(remoteData);
			res.writeHead(200, 'OK', {'Content-Type': 'text/plain'});
			res.write(JSON.stringify(answer));
			res.end();
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
		getHash(data, res);
	});
}
const server = http.createServer();
server.on('error', err => console.error(err));
server.on('request', handler);
server.on('listening', () => {
	console.log('Start HTTP on port %d', port);
});
server.listen(port);
