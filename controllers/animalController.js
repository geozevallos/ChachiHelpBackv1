const { Animal } = require("../models/animal_model")

class AnimalController{

    static findAnimal(req, res) { 
    Animal.find({tamanio: "mediano", color: "negro", especie: "Gato", raza: "Chusco", sexo: "Masculino"}
    ).then(data => {
        res.send(data)
    }).catch(err => {
        res.status(404).send({
            message: err.message
        })
    })
}
}


module.exports = { AnimalController }