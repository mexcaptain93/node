const expect = require('chai').expect;
const should = require('chai').should;

const http = require('http');

const user = {
	'name': 'Mikhail',
	'score': 100
};

const options = {
	host: 'localhost',
	port: 1337,
	method: 'POST',
	path: '/api/v1/users/',
	headers: {'Content-Type': 'application/json'}
};

describe('Server tests', () => {


	it('Should add user', done => {

		function handler(response) {
			let data = '';
			response.on('data', (chunk) => {
				data += chunk;
			});
			response.on('end', () => {
				expect(response.statusCode).to.equal(200);
				done();
			});
		}

		const request = http.request(options, handler);
		request.write(JSON.stringify(user));
		request.on('error', (err) => {console.log(err)});
		request.end();

	});
	it('Should delete user', done => {
		options.method = 'DELETE';
		options.path = '/api/v1/users/1';

		function handler(response) {
			let data = '';
			response.on('data', (chunk) => {
				data += chunk;
			});
			response.on('end', () => {
				expect(response.statusCode).to.equal(200);
				done();
			});
		}

		const request = http.request(options, handler);
		request.write(JSON.stringify(user));
		request.on('error', (err) => {console.log(err)});
		request.end();

	});

});