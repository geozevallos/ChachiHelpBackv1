const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

var PublicacionSchema = mongoose.Schema({
    tipopub: {
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
    },
    departamento: {
        type: String
    },
    provincia: {
        type: String
    },
    distrito: {
        type: String
    },
    usuarioregistro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'registro'
    },
    datoanimal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'animal'
    },
    
}, {
    timestamps: true
  })

PublicacionSchema.plugin(mongoosePaginate);

PublicacionSchema.index({localizacion: '2dsphere'});

const Publicacion = mongoose.model('publicacion', PublicacionSchema)

module.exports = {
    Publicacion
}