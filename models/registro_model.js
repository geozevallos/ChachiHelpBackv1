const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

var RegistroSchema = mongoose.Schema({
    correo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
    // usuario: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'usuario'
    // }
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

const Registro = mongoose.model('registro', RegistroSchema)