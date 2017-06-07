const readAll = require('./read-all');

readAll('./logs/')
	.then(files => files.forEach(show))
	.catch(err => console.error(err))
	.then(() => readAll('./logs2/'))
	.then(files => files.forEach(show))
	.catch(err => console.error(err));

function show(file) {
	console.log('-'.repeat(10));
	console.log(`Содержимое файла ${file.name}:`);
	console.log(file.content);
	console.log('-'.repeat(10));
}
