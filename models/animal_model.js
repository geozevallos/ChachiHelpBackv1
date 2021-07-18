const mongoose = require('mongoose')

var AnimalSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    edad: {
        type: String,
        required: true
    },
    tamanio: {
        type: String,
        required: true
    },
    color:{
        type: String,
        required: true
    },
    especie:{
        type: String,
        required: true
    },
    raza:{
        type: String,
        required: true
    },
    sexo: {
        type: String,
        required: true
    }
})



const Animal = mongoose.model('animal', AnimalSchema)

module.exports = {
    Animal
}