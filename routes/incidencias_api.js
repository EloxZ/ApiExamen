module.exports = function (app, https) {
    //Datos abiertos de incidencias de la DGT. Solo aperecen incidencias que siguen activas
    //Da las incidencias según la comunidad autónoma.
    app.get('/incidencia/autonomia/:autonomia', function (req, res){
        let url = 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/arcgis/rest/services/incidencias_DGT/FeatureServer/0/query?where=autonomia%20%3D%20\''+req.params.autonomia+'\'&outFields=autonomia,carretera,causa,fechahora_,matricula,nivel,poblacion,provincia,ref_incide,sentido,tipo,tipolocali,version_in,x,actualizad,y,X1,Y1&outSR=4326&f=json';

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

    //Da las incidencias según la provincia
    app.get('/incidencia/provincia/:provincia', function (req, res){
        let url = 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/arcgis/rest/services/incidencias_DGT/FeatureServer/0/query?where=provincia%20%3D%20\''+req.params.provincia+'\'&outFields=autonomia,carretera,causa,fechahora_,matricula,nivel,poblacion,provincia,ref_incide,sentido,tipo,tipolocali,version_in,x,actualizad,y,X1,Y1&outSR=4326&f=json';

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

    //Da las incidencias según la carretera
    app.get('/incidencia/carretera/:carretera', function (req, res){
        let url = 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/arcgis/rest/services/incidencias_DGT/FeatureServer/0/query?where=carretera%20%3D%20\''+req.params.carretera+'\'&outFields=autonomia,carretera,causa,fechahora_,matricula,nivel,poblacion,provincia,ref_incide,sentido,tipo,tipolocali,version_in,x,actualizad,y,X1,Y1&outSR=4326&f=json';

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