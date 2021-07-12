const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/SpatialData', {userNewUrlParser: true})


// Collection de distritos
const Distrito = mongoose.model('distritos', {})

//Colleccion de Veterinarias

const Veterinaria = mongoose.model('veterinarias', {})

module.exports = {
    Distrito,
    Veterinaria
}