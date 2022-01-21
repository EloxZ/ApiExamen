module.exports = function (app, gestorBD) {
    
    app.get("/pujas", function (req, res) {
        gestorBD.obtenerItem({}, 'pujas', function (pujas) {
            if (pujas == null) {
                res.send({ Error: { status: 500, data: "Se ha producido un error al obtener la lista de pujas, intentelo de nuevo más tarde" } })
            } else {
                res.send({status: 200, data: {pujas: pujas}});
            }
        });
    });

    app.post('/pujas/add', function (req, res) {
        //TODO hacer validador y encriptar la contraseña
        console.log(req.body);
        gestorBD.insertarItem(req.body, 'pujas', function (puja) {
            if (puja == null) {
                res.send({ Error: { status: 500, data: "Se ha producido un error al insertar la puja, intentelo de nuevo más tarde" } })
            }
            else {
                res.send({status: 200, data: {msg: 'Puja añadida correctamente'}})
            }
        });
    });
    
    app.put('/pujas/edit/:id', function (req, res) {
        let criterio = {"_id": gestorBD.mongo.ObjectID(req.params.id)};
        let nuevaPuja = req.body;
        gestorBD.modificarItem(criterio, nuevaPuja, 'pujas', function(result){
            if (result==null)
                res.send({ Error: { status: 500, data: "Se ha producido un error al editar la puja, intentelo de nuevo más tarde" } })
            else {
                res.send({status: 200, data: {msg: 'Puja editada correctamente'}})
            }
        })
    });
}