const express = require('express');
const app = express(); 
const bodyParser = require('body-parser'); 
const port = process.env.PORT || 3000;
const https = require('https');
var mongoose = require('mongoose');
var OAuth2Server = require('oauth2-server');
var Request = OAuth2Server.Request;
var Response = OAuth2Server.Response;

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

const path = require('path');
const morgan = require('morgan');
app.engine('html', require('ejs').renderFile); // Para que los archivos HTML los interprete como EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Para definir la ruta de las vistas

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//Configuracion de la base de datos mongo
let mongo = require('mongodb');
let gestorBD = require("./services/gestorBD");
var mongoUrl = 'mongodb://root:root@cluster0-shard-00-00.xrhm0.mongodb.net:27017,cluster0-shard-00-01.xrhm0.mongodb.net:27017,cluster0-shard-00-02.xrhm0.mongodb.net:27017/ExamenEloy?ssl=true&replicaSet=atlas-i6aji1-shard-0&authSource=admin&retryWrites=true&w=majority';
gestorBD.init(app, mongo);
app.set('db', mongoUrl);

mongoose.connect(mongoUrl, {
    useUnifiedTopology: true,
	useCreateIndex: true,
	useNewUrlParser: true
}, function(err, res) {

	if (err) {
		return console.error('Error connecting to "%s":', mongoUrl, err);
	}
	console.log('Connected successfully to "%s"', mongoUrl);
});

//OAuth
app.oauth = new OAuth2Server({
	model: require('./model.js'),
	accessTokenLifetime: 60 * 60,
	allowBearerTokensInQueryString: true,
	debug: true
});

app.all('/oauth/token', obtainToken);

app.get('/oauth/auth', authenticateRequest, function(req, res) {
	res.send("Hola!");
});

function obtainToken(req, res) {

	var request = new Request(req);
	var response = new Response(res);

	return app.oauth.token(request, response)
		.then(function(token) {

			res.send(token);
		}).catch(function(err) {

			res.status(err.code || 500).json(err);
		});
}

function authorizeRequest(req, res, next) {

	var request = new Request(req);
	var response = new Response(res);

	return app.oauth.authorize(request, response)
		.then(function(token) {
			
			next();
		}).catch(function(err) {

			res.status(err.code || 500).json(err);
		});
}

function authenticateRequest(req, res, next) {

	var request = new Request(req);
	var response = new Response(res);

	return app.oauth.authenticate(request, response)
		.then(function(token) {

			next();
		}).catch(function(err) {

			res.status(err.code || 500).json(err);
		});
}

//Rutas/controladores por lógica
require("./routes/users")(app, gestorBD);  // (app, param1, param2, etc.)
require("./routes/travels")(app, gestorBD);
require("./routes/wheater_api")(app, https);
require("./routes/incidencias_api")(app, https);
require("./routes/flickr_api")(app, https);
require("./routes/messages")(app, gestorBD);
require("./routes/conversations")(app, gestorBD, authenticateRequest);

//Controlador en caso de 404
app.get('*',function (req, res,next) {
    console.log("Error producido: ");
    res.send({ Error: { status: 404, data: "No se ha encontrado la pagina" } })
})
