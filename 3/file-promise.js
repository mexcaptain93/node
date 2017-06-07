const fs = require('fs');
const conf = { encoding: 'utf8'}

const read = (filename) => {
	return new Promise((success, reject) => {
		fs.readFile(filename, conf, (err, content) => {
			if (err) {
				reject(err);
			} else {
				success(content);
			}
		});
	});
};

const write = (filename, data) => {
	return new Promise((success, reject) => {
		fs.writeFile(filename, data, err => {
			if (err) {
				reject(err);
			} else {
				success(filename);
			}
		})
	});
};

module.exports = {
	read,
	write
};