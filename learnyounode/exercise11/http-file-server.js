const http = require('http');
const fs = require('fs');

const port = Number(process.argv[2]);
const location = process.argv[3];

const server = http.createServer(function(req, res) {
	const stream = fs.createReadStream(location);
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	stream.pipe(res);
});

server.listen(port);
