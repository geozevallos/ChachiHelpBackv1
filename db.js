const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/SpatialData', {userNewUrlParser: true})


// Collection de distritos
const Distrito = mongoose.model('distritos', {})

// Collection de provincias
const Provincia = mongoose.model('provincias', {})

// Collection de departamentos
const Departamento = mongoose.model('departamentos', {})

//Colleccion de Veterinarias
const Veterinaria = mongoose.model('veterinarias', {})

// Coleccion de Especies
const Razas = mongoose.model('razas', {})

module.exports = {
    Distrito,
    Provincia,
    Departamento,
    Veterinaria,
    Razas
}