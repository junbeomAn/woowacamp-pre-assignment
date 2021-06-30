const fs = require("fs");
fs.readdir(process.argv[2], function(err, list) {
	if (err) console.log(err);
	const filter = process.argv[3];
	list
	.filter(v => v.endsWith("." + filter))
	.forEach(filename => {
		console.log(filename)
	})
});
