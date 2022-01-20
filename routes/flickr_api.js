const API_KEY = '21243630aaaa2b4a6f0ad9f4faecb9b3';
const SECRET = 'c1d63afeb02e2a4d';
var Flickr = require('flickr-sdk');

module.exports = function (app, https) {

    app.get('/flickr/search/:busqueda', function (req, res)
    {
        let url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&api_key='+ API_KEY + '&tags="' + req.params.busqueda + '"';
        
        https.get(url, (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
               res.send(data);
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    });

    app.get('/flickr/search10/:busqueda', function (req, res)
    {
        let url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&per_page=10&format=json&nojsoncallback=1&api_key='+ API_KEY + '&text="' + req.params.busqueda + '"';
        console.log(url);
        https.get(url, (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
               res.send(data);
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    });

    app.get('/flickr/searchAPP/', function (req, res)
    {
        let url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&per_page=10&format=json&nojsoncallback=1&api_key='+ API_KEY + '&tags="UMAIWEB2021A2"';
        console.log(url);
        https.get(url, (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
               res.send(data);
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    });

    //Lo dejo aquí por si se quiere hacer integración con Flickr mas adelante
    /*
    app.get('/flickr/verify', function (req, res) 
    {
        var oauth = new Flickr.OAuth(API_KEY, SECRET);
        console.log(oauth);
        oauth.request('localhost:3000/flickr/add/').then(function (req)
        {
            console.log(req)
            var url = oauth.authorizeUrl(req.body.oauth_token, "write");
            
            res.send({url: url});
        }
        ).catch(function (err){
            //TODO FALLO
        })
    });

    app.get('/flickr/add/', function (req, res) {
        
        var oauth = new Flickr.OAuth(API_KEY, SECRET);
        console.log(oauth);
        var urlParams = new URLSearchParams(req.url);
        console.log(urlParams)
        var oauth_token = urlParams.get('/flickr/add/?oauth_token');
        var oauth_verifier = urlParams.get('oauth_verifier');


        oauth.verify(oauth_token, oauth_verifier, SECRET).then(function (res) {
            console.log(resultado ,res);
        }).catch(function (err) {
            console.log(err);
        })
        
        //TODO hacer validador y encriptar la contraseña

        /*var oauth = new Flickr.OAuth(API_KEY,SECRET);
        console.log("e");
        oauth.request('http://localhost:3000/oauth/callback').then(function (req) {
            console.log('Request Token: ', req);
            var url = oauth.authorizeUrl(req.body.oauth_token, "write");
            
            console.log(url);

            var auth = new Flickr(Flickr.OAuth.createPlugin(
                API_KEY, 
                SECRET, 
                req.body.oauth_token, 
                req.body.oauth_token_secret
            ));

            console.log(auth);

            

            var upload = new Flickr.Upload(auth._, 'upload.jpg', {
                title: 'epico manin'
            });

            console.log('Upload: ', upload);



            upload.then(function (uploadres) {
                console.log('yay!', uploadres.body);
              }).catch(function (uploaderr) {
                res.send({ Error: { status: 500, data: uploaderr } });
                
              });

        }).catch(function (err) {
            res.send('Fallo al obtener el Request Token', err);
        });




       
    });*/



}
