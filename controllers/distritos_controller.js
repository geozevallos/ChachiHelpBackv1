const { Distrito } = require("../db");



// Mostrar distritos filtrando 
class DistritoController{
    static findByIdProv(req, res){
        let idprov = req.params.idprov
        Distrito.find({"properties.IDPROV": idprov}, {properties:1}).
            then(data => {
                let datin = []
                data.forEach(data => {
                    let datos = data.toObject();
                    let datos2 = {label:datos.properties.DISTRITO, value: datos.properties.IDDIST}
                    datin.push(datos2)
                });
                res.send(datin);
            }).catch(err => {
                res.status(404).send({
                    message: err.message
                })
            })
    }
}


module.exports = {DistritoController}

