const bl = require("bl");
const http = require("http");
const url = process.argv[2];
http.get(url, function (res) {
	res.pipe(bl(function (err, data) {
		if (err) {
			console.log(err);
			return ;
		}
		const str = data.toString();
		console.log(str.length);
		console.log(str);
	}))
}).on('error', (err) => {
	console.log(err);
});
