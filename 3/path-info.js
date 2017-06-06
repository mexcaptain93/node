const fs = require('fs');

const pathInfo = (path, callback) => {
	fs.lstat(path, (err, data) => {
		let info = {
			path: path,
			type: undefined,
			content: undefined,
			childs: []
		};
		if (data.isFile()) {
			info.type = 'file';
			fs.readFile(path, 'utf8', (error, data) => {
				if (error) {
					callback(error);
				}
				else {
					info.content = data;
					callback(null, info);
				}
			});
			return;
		} else if (data.isDirectory()) {
			info.type = 'directory';
			fs.readdir(path, (error, files) => {
				if (error) {
					callback(error);
				}
				else {
					info.childs = files;
					callback(null, info);
				}
			});
			return;
		}
		callback(null, info);
	});
};

module.exports = pathInfo;