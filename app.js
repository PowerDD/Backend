var http = require('http')
	, express = require('express')
	, favicon = require('serve-favicon')
	, fs = require('fs')
	, path = require('path')
	, methodOverride = require('method-override')
	, bodyParser = require('body-parser')
	, errorHandler = require('errorhandler')
	, routes = require('./routes')
	, i18n = require('i18n')	
	, cookieParser = require('cookie-parser')
	, compress = require('compression')

global.config = require('./config.js');
	
i18n.configure({
	locales: ['th', 'en'],
	defaultLocale: 'th',
	directory: __dirname + '/locales'
});

var app = express();

app.set('port', config.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon(__dirname + '/favicon.ico'));
app.use(methodOverride());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 365 * 24 * 60 * 60 * 1000 }));
app.use(i18n.init);
app.use(cookieParser(config.cookieSecret));
app.use(compress());

if ('development' == app.get('env')) {
	app.use(errorHandler());
}

app.get('*', function(req, res) {

	if (typeof req.cookies.language == 'undefined') {
		res.cookie('language', 'th');
		res.setLocale('th');
	} else {
		res.setLocale(req.cookies.language);
	}

	var url = req.headers['uri'].split('/');
	url = url.filter(function(n){ return n !== ''; });

	if (url[0] == 'language' && url.length >= 1)
	{
		res.cookie('language', url[1]);
		req.setLocale(url[1]);
		res.redirect(req.get('referer'));
	}
	else {
		data = {};
		data.screen = (typeof req.cookies.memberKey == 'undefined' || req.cookies.memberKey == '') ? 'login' : 'index';
		data.language = req.cookies.language;
		data.memberInfo = {};
		data.memberInfo.locale = 'th_Th';

		if ( data.screen != 'login' ) {
			if ( url.length >= 1 ) {
				data.screen = url[0];
				fs.exists('./views/'+data.screen+'.jade', function (exists) {
					if (exists) {
						fs.exists('./public/javascripts/'+data.screen+'.js', function (exists) {
							data.script = (exists) ? '/javascripts/'+data.screen+'.js' : '';	
							data.subUrl = (url.length == 1 ) ? '' : url[1];
						});
					}
				});
			}
		}
		routes.index(req, res, data);
	}

});

var server = http.createServer(app);
server.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
