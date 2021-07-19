const jwt = require('jsonwebtoken')
const { Registro } = require('../models/registro_model')


class RegistroController {


    // {
    //     "correo": "abcededa@gmail.com",
    //     "password": "aasdadad"
    // }

    static auth(req,res){
        let correo = req.body.correo
        let password = req.body.password


        Registro.autenticar(correo, password, (err, usuario) => {
            if(err){
                err.status = 401
                res.sendStatus(401)
            } else {
                let payload = {correo: usuario.correo, id: usuario._id}
                const token = jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: '1800s'})
                res.json(token)
            }
        })
    }


    static findAll(req, res){
        Registro.find({},{password:0, __v:0}).
        populate({
            path: 'usuario',
            select: '-__v'
        }).then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message,
            });
          });
    }


    static findById(req, res){
        let pk = req.params.id;
        Registro.findById(pk, {password:0, __v:0}).populate({
            path: 'usuario',
            select: '-__v'            
        }).then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message,
            });
          });
    }
}


module.exports = {RegistroController}