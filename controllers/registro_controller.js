const jwt = require("jsonwebtoken");
const { Registro } = require("../models/registro_model");
const { Usuario } = require("../models/usuario_models");

class RegistroController {
  // {
  //     "correo": "abcededa@gmail.com",
  //     "password": "aasdadad"
  //     "correo": "juasda@gmail.com",
  //     "password": "aasdadad"
  // }

  static auth(req, res) {
    let correo = req.body.correo;
    let password = req.body.password;

    Registro.autenticar(correo, password, (err, usuario) => {
      if (err) {
        err.status = 401;
        res.sendStatus(401);
      } else {
        let usuariopk = usuario.usuario;
        Usuario.findById(usuariopk, { __v:0})
          .then((data) => {

            let payload = {  
                id: usuario._id,
                nombre: data.nombre,
                avatar: data?.avatar
            };

            const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
                expiresIn: "1800s",
              });
              res.json(token);

          })
          .catch((err) => {
            res.status(404).send({
              message: err.message,
            });
          });
        
        

      }
    });
  }

  static findAll(req, res) {
    Registro.find({}, { password: 0, __v: 0 })
      .populate({
        path: "usuario",
        select: "-__v",
      })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
  }

  static findById(req, res) {
    let pk = req.params.id;
    Registro.findById(pk, { password: 0, __v: 0 })
      .populate({
        path: "usuario",
        select: "-__v",
      })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
  }


  // localhost:7100/addguardado/iddelapublicacion
  static addGuardados(req, res){
    let registro_pk = res.locals.payload.id
    let idpub = req.params.id

    Registro.findById(registro_pk).then(datos => {
      if(datos.guardados.length > 0){
        const repetidos = datos.guardados.filter(dato => dato == idpub)
        if (repetidos.length > 0){
          res.status(400).send({
            message: "Ya has agregado esta publicación"
          })
        } else {
          Registro.findByIdAndUpdate(registro_pk, {$push:{ guardados: idpub}})
          .then(()=> {
            res.send("Usuario actualizado");
          }).catch((err) => {
            res.status(500).send({
              message: err.message,
            });
          });
        }
      } else{
        Registro.findByIdAndUpdate(registro_pk, {$push:{ guardados: idpub}})
        .then(()=> {
          res.send("Usuario actualizado");
        }).catch((err) => {
          res.status(500).send({
            message: err.message,
          });
        });
      }
    })
  }




  // localhost:7100/getguardados
  static showGuardados(req, res){
    let registro_pk = res.locals.payload.id

    Registro.findById(registro_pk, {guardados:1, _id:0})
    .populate({
      path: "guardados",
      select: "-__v",
      match: {eliminado: null},
      populate: [
        {
          path: "usuarioregistro",
          select: "-__v -password -guardados",
          populate: {
            path: "usuario",
            select: "-__v"
          }
        },{
          path: "datoanimal",
          select: "-__v"
        }
      ]
    })
    .then((data) => {
      res.send(data);
    }).catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
  }

  static removeGuardado(req,res){
    let registro_pk = res.locals.payload.id
    let idpub = req.params.id

    Registro.findByIdAndUpdate(registro_pk, {$pull:{ guardados: idpub}})
          .then(()=> {
            res.send("Publicación eliminada de guardados");
          }).catch((err) => {
            res.status(500).send({
              message: err.message,
            });
          });

  }

}

module.exports = { RegistroController };
