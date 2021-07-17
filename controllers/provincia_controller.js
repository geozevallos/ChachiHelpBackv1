const { Provincia } = require("../db");



// Mostrar distritos filtrando 
class ProvinciaController{
    static findByIdDpto(req, res){
        let iddpto = req.params.iddpto
        Provincia.find({"properties.IDDPTO": iddpto}, {properties:1, _id:0}).
            then(data => {
                let datin = []
                data.forEach(data => {
                    let datos = data.toObject();
                    let datos2 = {label:datos.properties.PROVINCIA, value: datos.properties.IDPROV}
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


module.exports = {ProvinciaController}