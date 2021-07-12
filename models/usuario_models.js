const mongoose = require('mongoose')

// Esquema para usuarios
var UsuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
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
    celular: {
        type: String
    },
    telefono: {
        type: String
    },
    eliminado: {
        type: Boolean
    },
    fecha_elim: {
        type: Date
    }
    
    // profile: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'profile'
    // },
    // logs: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'authlogger'
    //     }
    // ]
})


UsuarioSchema.path('correo').validate(function (correo) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(correo.toLowerCase());
 }, 'El correo debe ser valido.')


const Usuario = mongoose.model('usuario', UsuarioSchema)


module.exports = {
    Usuario
}