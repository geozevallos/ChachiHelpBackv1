const { Departamento } = require("../db");



// Mostrar distritos filtrando 
class DepartamentoController{
    static findAll(req, res){
        Departamento.find({}, {properties:1, _id:0}).
            then(data => {
                res.send(data)
            }).catch(err => {
                res.status(404).send({
                    message: err.message
                })
            })
    }
}

module.exports = {DepartamentoController}