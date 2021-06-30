const http = require('http');

function parseTime(time) {
    return {
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: time.getSeconds()
    }
} 

function toUnixTime(time) {
     return {
        unixtime: time.getTime()
     }
}

const server = http.createServer(function(req, res) {
	if (req.method !== 'GET') {
		return res.end('Only GET method available');
	}
	const urlObj = new URL(req.url, `http://${req.headers.host}`);
	const iso = new Date(urlObj.searchParams.get('iso'));
	let result;

	if (req.url.startsWith('/api/parsetime')) {
		result = parseTime(iso);
	} else if (req.url.startsWith('/api/unixtime')) {
		result = toUnixTime(iso);
	}

	if (result) {
		res.writeHead(200, { 'content-type': 'application/json' });
		res.end(JSON.stringify(result));
	} else {
		res.writeHead(404);
		res.end();
	}

})

server.listen(Number(process.argv[2]));
