const { Distrito } = require("../db");



// Mostrar distritos filtrando 
class DistritoController{
    static findByIdProv(req, res){
        let idprov = req.params.idprov
        Distrito.find({"properties.IDPROV": idprov}, {properties:1}).
            then(data => {
                res.send(data)
            }).catch(err => {
                res.status(404).send({
                    message: err.message
                })
            })
    }
}


module.exports = {DistritoController}