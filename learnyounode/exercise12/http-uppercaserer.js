const http = require('http');
const map = require('through2-map');

const server = http.createServer(function(req, res) {
	if (req.method !== 'POST') {
		res.end('Only POST method available\n');
		return ;
	}
	req.pipe(map(function(chunk) {
		return chunk.toString().toUpperCase();
	})).pipe(res);
});

server.listen(Number(process.argv[2]));
