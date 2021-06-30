const http = require('http');
const bl = require('bl');
const [url1, url2, url3] = process.argv.slice(2);

http.get(url1, function(res) {
	
	res.pipe(bl(function (err, data) {
		if (err) {
			console.log(err);
			return ;
		}
		console.log(data.toString());

		http.get(url2, function(res2) {
			res2.pipe(bl(function (err2, data2){
				if (err2) {
					console.log(err2);
					return ;
				}
				console.log(data2.toString());
			
				http.get(url3, function(res3) {
					res3.pipe(bl(function (err3, data3) {
						if (err3) {
							console.log(err3);
							return ;
						}
						console.log(data3.toString());
					}))
				})
	
			}))	
		});
	}))

})
