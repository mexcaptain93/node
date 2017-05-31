const fs = require('fs');
const crypto = require('crypto');

const input = fs.createReadStream("in.txt");
const output = fs.createWriteStream("out.txt");

const hash = crypto.createHash('md5');
hash.setEncoding('hex');
input.on("end", (data) => {
	hash.end();
	hash.read();
});


input.pipe(hash).pipe(output);
input.pipe(hash).pipe(process.stdout);

