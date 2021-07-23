const { Razas } = require('../db')

class RazaController{

    // localhost:7100/razas/gato
    static getRazas(req, res){
        let idesp = req.params.idesp
        Razas.find({especie: idesp}, {_id: 0, especie:0}).then(data => {
            let rpta = []
            data.forEach(raza => {
                let objraza = raza.toObject();
                let dato = {label: objraza.raza, value:objraza.id}
                rpta.push(dato);
            })
            res.send(rpta)
        }
        ).catch(err => {
            res.status(404).send({
                message: err.message
            })
        })
    }
}


module.exports = {RazaController}