const express = require('express');
const app = express(); 
const port = process.env.PORT || 3000;
const https = require('https');

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

const path = require('path');
const morgan = require('morgan');
app.engine('html', require('ejs').renderFile); // Para que los archivos HTML los interprete como EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Para definir la ruta de las vistas

// Middlewares
app.use(morgan('dev'));
app.use(express.json());


//Configuracion de la base de datos mongo
let mongo = require('mongodb');
let gestorBD = require("./services/gestorBD");
gestorBD.init(app, mongo);
app.set('db', 'mongodb://root:root@cluster0-shard-00-00.xrhm0.mongodb.net:27017,cluster0-shard-00-01.xrhm0.mongodb.net:27017,cluster0-shard-00-02.xrhm0.mongodb.net:27017/ExamenEloy?ssl=true&replicaSet=atlas-i6aji1-shard-0&authSource=admin&retryWrites=true&w=majority');

//Rutas/controladores por lógica
require("./routes/users")(app, gestorBD);  // (app, param1, param2, etc.)
require("./routes/travels")(app, gestorBD);
require("./routes/wheater_api")(app, https);
require("./routes/incidencias_api")(app, https);
require("./routes/flickr_api")(app, https);
require("./routes/messages")(app, gestorBD);
require("./routes/conversations")(app, gestorBD);

//Controlador en caso de 404
app.get('*',function (req, res,next) {
    console.log("Error producido: ");
    res.send({ Error: { status: 404, data: "No se ha encontrado la pagina" } })
    
})
