const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

var RegistroSchema = mongoose.Schema({
    correo: {
        type: String,
        required: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario'
    },
    guardados: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'publicacion'
        }
    ]
})

RegistroSchema.path('correo').validate(function (correo) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(correo.toLowerCase());
 }, 'El correo debe ser valido.')


RegistroSchema.pre('save', function(next){
    let usuario = this

    bcrypt.genSalt(15, (err, salt) => {
        bcrypt.hash(usuario.password, salt, (err,hash) => {
            if(err){
                return next(err);
            }
            else {
                usuario.password = hash
                next();
            }
        }) 
    })
})


RegistroSchema.statics.autenticar = function(correo, password, callback){
    Registro.findOne({correo: correo}).exec((err, usuario) => {
        if (err){
            return callback(err);
        } else if(!usuario){
            let err = new Error("Usuario no encontrado")
            err.status = 401
            return callback(err)
        } else {
            bcrypt.compare(password, usuario.password, function(
                err, result
            ){
                if(result == true){
                    return callback(null, usuario)
                } else {
                    let err = new Error("Clave incorrecta")
                    err.status = 401
                    return callback(err)
                }
            })
        }
    })
}

const Registro = mongoose.model('registro', RegistroSchema)

module.exports = {
    Registro
}