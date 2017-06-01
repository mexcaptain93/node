const fs = require('fs');
const crypto = require('crypto');

const inStream = fs.createReadStream('in.txt');
const outStream = fs.createWriteStream('out.txt');

const hash = crypto.createHash('md5');
hash.setEncoding('hex');

inStream.pipe(hash);

hash.pipe(process.stdout);
hash.pipe(outStream);