var http = require('http')
	, express = require('express')
	, favicon = require('serve-favicon')
	, fs = require('fs')
	, path = require('path')
	, methodOverride = require('method-override')
	, bodyParser = require('body-parser')
	, errorHandler = require('errorhandler')
	, routes = require('./routes');
i18n.configure({
	locales: ['th', 'en'],
	defaultLocale: 'th',
	directory: __dirname + '/locales'
});
var app = express();

app.set('port', 9991);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon(__dirname + '/favicon.ico'));
app.use(methodOverride());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
	app.use(errorHandler());
}

app.get('*', function(req, res) {
	data = {};
	data.screen = 'index';

	routes.index(req, res, data);

});

var server = http.createServer(app);
server.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
