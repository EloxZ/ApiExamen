const API_KEY = '9316103ac6f44ce8b03103040212511';

module.exports = function (app, https) {
    // Devuelve datos meteorologicos en el momento actual
    app.get('/weather/realtime/:location', function (req, res){
        let url = 'https://api.weatherapi.com/v1/current.json?key=' + API_KEY + '&q=' + req.params.location;

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

    // Devuelve datos meteorologicos para x dias en el futuro
    app.get('/weather/forecast/:location&:days?', function (req, res){

        
        if (req.params.days!=undefined)
        {
            var dias = req.params.days;
        }
        else
        {
            var dias = "3";
        }
        let url = 'https://api.weatherapi.com/v1/forecast.json?key=' + API_KEY + '&q=' + req.params.location + '&days=' + dias + '&aqi=no&alerts=no';

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

    // Devuelve datos astronomicos (salida y puesta del sol, p.ej.) en un sitio concreto
    app.get('/weather/astronomy/:location&:date?', function (req, res){

        if (req.params.date!=undefined)
        {
            var dia = req.params.date;
        }
        else
        {
            var today = new Date();
            var dia = today.getDate();
        }
        

        let url = 'https://api.weatherapi.com/v1/astronomy.json?key=' + API_KEY + '&q=' + req.params.location + '&dt=' + dia;
        
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
}