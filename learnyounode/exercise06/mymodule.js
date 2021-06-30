const fs = require("fs");
const path = require("path");

module.exports = function (dirname, ext, callback) {
	fs.readdir(dirname, function(err, data) {
		if (err) return callback(err);
		
		callback(null, data.filter(filename => {
			return path.extname(filename) === ("." + ext);
		}));
	})
}
