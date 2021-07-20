const jwt = require("jsonwebtoken");
const { Registro } = require("../models/registro_model");
const { Usuario } = require("../models/usuario_models");

class RegistroController {
  // {
  //     "correo": "abcededa@gmail.com",
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
}

module.exports = { RegistroController };
