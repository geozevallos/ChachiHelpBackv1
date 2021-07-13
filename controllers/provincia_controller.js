const { Provincia } = require("../db");



// Mostrar distritos filtrando 
class ProvinciaController{
    static findByIdDpto(req, res){
        let iddpto = req.params.iddpto
        Provincia.find({"properties.IDDPTO": iddpto}, {properties:1, _id:0}).
            then(data => {
                res.send(data)
            }).catch(err => {
                res.status(404).send({
                    message: err.message
                })
            })
    }
}


module.exports = {ProvinciaController}