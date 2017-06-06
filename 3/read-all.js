const fs = require('fs');
const filePromise = require('./file-promise');

const temp = [];
const readAll = (path) => {
	return new Promise((success, reject) => {
		fs.readdir(path, (err, files) => {
			if (err) {
				reject(err)
			} else {
				files.forEach(file => {
					temp.push(filePromise.read(path + '/' + file));
				});
				Promise.all(temp).then(fileData => {
					const result = files.map((f, i) => {
						return {
							name: f,
							content: fileData[i]
						}
					});
					success(result);
				});
			}
		});
	});
};

module.exports = readAll;