const { Departamento } = require("../db");



// Mostrar distritos filtrando 

class DepartamentoController{
    static findAll(req, res){
        Departamento.find({}, {properties:1, _id:0}).
            then(data => {
                let datin = []
                data.forEach(data => {
                    let datos = data.toObject();
                    let datos2 = {label:datos.properties.DEPARTAMEN, value: datos.properties.IDDPTO}
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


module.exports = {DepartamentoController}


