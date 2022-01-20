module.exports = function (app, https) {
    app.put('/imagenes', function (req, res){
        console.log(req.body);
    });
}