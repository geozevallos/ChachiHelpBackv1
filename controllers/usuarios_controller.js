const { Distrito } = require("../db");
const { Usuario } = require("../models/usuario_models");
const { Registro } = require("../models/registro_model");

class UsuarioController {
  /**
 * localhost:7100/registro?iddist=60e9f0b2848ad4cb16eaa344
    {
    "correo": "abcededa@gmail.com",
    "password": "aasdadad",
    "usuario": {
            "nombre": "Pepito",
            "apellidos": "Cuajinais Palacios",
            "celular": "985645875",
            "departamento": "LIMA",
            "provincia": "LIMA",
            "distrito": "SURCO"
            
    }
}
 */

  /** 
    static registro(req, res){
        let registroData = req.body
        let usuarioData = req.body.usuario
        let pk = req.query.iddist

        Distrito.findById(pk).then(distr => {
            let datos = distr.toObject()
            let dep = datos.properties.DEPARTAMEN
            let prov = datos.properties.PROVINCIA
            let dist = datos.properties.DISTRITO

            usuarioData.departamento = dep
            usuarioData.provincia = prov
            usuarioData.distrito = dist
            usuarioData.avatar = avatar

            let nuevoUsuario = new Usuario(usuarioData);

            nuevoUsuario.save().then(data => {
                let nuevoRegistro = new Registro(registroData)
                nuevoRegistro.usuario = data._id
                nuevoRegistro.save().then(data => {
                    res.send('El usuario se ha registrado correctamente')
                }).catch(err => {
                    res.status(500).send({
                        message: err.message
                    })
                })
            }).catch(err => {
                res.status(500).send({
                    message: err.message
                })
            })
        }).catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
    }

*/
  static registro(req, res) {
    let registroData = req.body;
    let usuarioData = req.body.usuario;
    usuarioData.fecha_creacion = new Date();

    let nuevoUsuario = new Usuario(usuarioData);

    nuevoUsuario
      .save()
      .then((data) => {
        let nuevoRegistro = new Registro(registroData);
        nuevoRegistro.usuario = data._id;
        nuevoRegistro
          .save()
          .then((data) => {
            res.send("El usuario se ha registrado correctamente");
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message,
            });
          });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
  }

  static safeDelete(req, res) {
    let pk = req.params.id;
    let data = {
      eliminado: true,
      fecha_elim: new Date(),
    };

    Usuario.findByIdAndUpdate(pk, data)
      .then((elim) => {
        res.send("Usuario eliminado correctamente");
      })
      .catch((err) => {
        res.sendStatus(500);
      });
  }

  static update(req, res) {
    let pk = req.params.id;
    let data = req.body;
    Usuario.findByIdAndUpdate(pk, data)
      .then((dato) => {
        res.send(dato);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
  }

  static findAll(req, res) {
    Usuario.find({
      eliminado: null,
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
    Usuario.findById(pk)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(404).send({
          message: err.message,
        });
      });
  }
}

module.exports = { UsuarioController };
