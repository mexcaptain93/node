const fs = require('fs');
const input = fs.createReadStream("in.txt");
const output = fs.createWriteStream("out2.txt");

const crypto = require('crypto');

const Transform = require('stream').Transform;
const transformer = new Transform();

class Hash {
	constructor(src) {
		this.src = src;
	}
	calculateHash() {
		return crypto.createHash('md5').update(this.src).digest('hex');
	}
}

transformer._transform = function(data, encoding, cb) {
	let myHash = new Hash(data.toString());
	this.push(myHash.calculateHash());
	cb();
}

input.pipe(transformer);
transformer.pipe(process.stdout);
transformer.pipe(output);