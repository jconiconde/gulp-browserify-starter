var http = require('http'),
	express = require('express'),
	app = express(),
	fs = require('fs'),
	port = (process.env.PORT || 8007);

app.use(express.static('./dist'));
server = http.createServer(app);

app.get('/', function(req, res) {
	fs.createReadStream('./dist/index.html')
	.pipe(res);
});

app.listen(port, function(err) {
	if (err) {
		console.log(err);
	}
	console.log('Server listening on port ' + port);
	console.log('env = ' + port +
		'\n__dirname = ' + __dirname +
		'\nprocess.cwd = ' + process.cwd() + 
		'\nNODE_ENV = ' + process.NODE_ENV);
 	console.log('URL = http://' + require('ip').address() + ':' + port);
});