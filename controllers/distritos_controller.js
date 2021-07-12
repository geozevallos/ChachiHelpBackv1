const { Distrito } = require("../db");



// Mostrar distritos filtrando 
class DistritoController{
    static findAll(req, res){
        Distrito.find({"properties.IDDPTO": "10"}, {properties:1}).
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