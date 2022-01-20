module.exports = function (app, gestorBD) {
    
   

    app.get("/", function (req, res) {
        gestorBD.obtenerItem({}, 'mensajes', function (mensajes) {
            if (mensajes == null) {
                res.send({ Error: { status: 500, data: "Se ha producido un error al obtener la lista de mensajes, intentelo de nuevo más tarde" } })
            } else {
                res.send({status: 200, data: {mensajes: mensajes}});
            }
        });
    });

    app.post('/messages/add', function (req, res) {
        //TODO hacer validador y encriptar la contraseña
        console.log(req.body);
        var cuerpo = req.body;
        cuerpo.stamp = new Date();
        
        console.log(cuerpo);
        gestorBD.insertarItem(req.body, 'mensajes', function (mensaje) {
            if (mensaje == null) {
                console.log("WARN: Fallo al insertar un mensaje")
                res.send({ Error: { status: 500, data: "Se ha producido un error al insertar el mensaje, intentelo de nuevo más tarde" } })
            }
            else {
                res.send({status: 200, data: {msg: 'Mensaje añadido correctamente'}})
            }
        });
    });

    app.delete('/messages/delete', function (req, res) {
        let criterio = {"_id": gestorBD.mongo.ObjectID(req.body.id)};
        gestorBD.eliminarItem(criterio, 'mensajes', function(result){
            if (result==null){
                res.send({ Error: { status: 500, data: "Se ha producido un error al borrar el mensaje, intentelo de nuevo más tarde" } })
            }
            else {
                res.send({status: 200, data: {msg: 'Mensaje eliminado correctamente'}})
            }
        })
    });

    app.get('/messages/edit/:id', function (req, res) {
        let criterio = {"_id": gestorBD.mongo.ObjectID(req.params.id)};
        gestorBD.obtenerItem(criterio, 'mensajes', function(mensaje){
            if(mensaje==null){
                res.send({ Error: { status: 500, data: "Se ha producido un error inesperado, intentelo de nuevo más tarde" } })
            }
            else {
                res.send({status: 200, data: {mensaje: mensaje}})            }
        });        
    })
    
    app.put('/messages/edit/:id', function (req, res) {
        console.log(req.body);
        let criterio = {"_id": gestorBD.mongo.ObjectID(req.params.id)};
        let nuevoMensaje = req.body;
        gestorBD.modificarItem(criterio, nuevoMensaje, 'mensajes', function(result){
            if (result==null)
                res.send({ Error: { status: 500, data: "Se ha producido un error al editar el mensaje, intentelo de nuevo más tarde" } })
            else {
                res.send({status: 200, data: {msg: 'Mensaje editado correctamente'}})
            }
        })
    });

}