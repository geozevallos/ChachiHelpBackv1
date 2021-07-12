const mongoose = require('mongoose')

var PublicacionSchema = mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    idtipopub: {
        type: String,
        required: true
    },
    imagen: {
        type: String
    },
    descripcion:{
        type: String
    },
    ubicacion_ref:{
        type: String
    },
    localizacion: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      }
})


PublicacionSchema.index({localizacion: '2dsphere'});

const Publicacion = mongoose.model('publicacion', PublicacionSchema)

module.exports = {
    Publicacion
}