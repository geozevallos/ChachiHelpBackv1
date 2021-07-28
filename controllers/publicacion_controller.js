const { Distrito } = require("../db");
const { Animal } = require("../models/animal_model");
const { Publicacion } = require("../models/publicacion_model");

class PublicacionController {
  /**
 * 
 * 
 
    {
        "tipopub": "01",
        "imagen": "imagen.png",
        "descripcion": "Perro perdido de color tal tal tal tal tal",
        "ubicacion_ref": "Se perdió cerca a ciudad de Dios",
        "localizacion" : {
            "type" : "Point",
            "coordinates" : [
                -77.06811629087467,
                -11.986777286151154
            ]
        },
        "animal": {
             "nombre": "Firulais",
             "edad": "2",
             "tamanio": "mediano",
             "color": "negro",
             "especie": "Perro",
             "raza": "Pitbull",
             "sexo": "Masculino"
            }
    }

*/

  // static Crear(req, res){
  //     let usuario_pk = res.locals.payload.id
  //     let coords = req.body.localizacion.coordinates

  //     Distrito.find({}).where('geometry').intersects().geometry({type: 'Point', coordinates: coords})
  //         .then(data => {
  //             let datos = data[0].toObject();
  //             let dep = datos.properties.DEPARTAMEN
  //             let prov = datos.properties.PROVINCIA
  //             let dist = datos.properties.DISTRITO

  //             let json_data = req.body
  //             json_data.departamento = dep
  //             json_data.provincia = prov
  //             json_data.distrito = dist
  //             json_data.usuarioregistro = usuario_pk

  //             const nueva_publicacion = new Publicacion(json_data)

  //             nueva_publicacion.save().then(data =>{
  //                 res.send(data)
  //             }).catch(err => {
  //                 res.status(500).send({
  //                     message: err.message
  //                 })
  //             })
  //         }).catch(err => {
  //             res.status(500).send({
  //                 message: err.message
  //             })
  //         })

  // }

  static Crear(req, res) {
    let usuario_pk = res.locals.payload.id;
    let coords = req.body.localizacion.coordinates;
    let publicacion_data = req.body;
    let animaldata = req.body.animal;

    let nuevoAnimal = new Animal(animaldata);

    nuevoAnimal
      .save()
      .then((data) => {
        publicacion_data.usuarioregistro = usuario_pk;
        publicacion_data.datoanimal = data._id;
        Distrito.find({})
          .where("geometry")
          .intersects()
          .geometry({ type: "Point", coordinates: coords })
          .then((data) => {
            let datos = data[0].toObject();
            let dep = datos.properties.DEPARTAMEN;
            let prov = datos.properties.PROVINCIA;
            let dist = datos.properties.DISTRITO;

            publicacion_data.departamento = dep;
            publicacion_data.provincia = prov;
            publicacion_data.distrito = dist;

            const nueva_publicacion = new Publicacion(publicacion_data);

            nueva_publicacion
              .save()
              .then((data) => {
                res.send(data);
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
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
  }

  // localhost:7100/publicaciones?long=-76.9782623&lat=-12.1519949&maxdist=500
  static findNearMe(req, res) {
    let long = +req.query.long;
    let lat = +req.query.lat;
    let maxdist = +req.query.maxdist;
    let coords = [long, lat];

    Publicacion.find({eliminado: null})
      .near("localizacion", {
        center: { type: "Point", coordinates: coords },
        maxDistance: maxdist,
      })
      .populate({
        path: "usuarioregistro",
        select: "-__v -password",
        populate: { path: "usuario", select: "-__v" },
      })
      .populate({
        path: "datoanimal",
        select: "-__v",
      })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(404).send({
          message: err,
        });
      });
  }

  // localhost:7100/publicaciones?limit=2&page=2
  static findAll(req, res) {
    let page = req.query.page || 1;
    let limit = req.query.limit || 10;
    Publicacion.paginate(
      {eliminado: null},
      {
        select: "-__v",
        populate: [
          {
            path: "usuarioregistro",
            select: "-__v -password",
            populate: { path: "usuario", select: "-__v" },
          },
          {
            path: "datoanimal",
            select: "-__v",
          },
        ],
        sort: { createdAt: -1 },
        page: page,
        limit: limit,
      }
    )
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(404).send({
          message: err.message,
        });
      });
  }

  // localhost:7100/publicaciones?limit=2&page=2
  static findByType(req, res) {
    let page = req.query.page || 1;
    let limit = req.query.limit || 10;
    let tipo = req.params.idtype;
    Publicacion.paginate(
      { tipopub: tipo, eliminado: null},
      {
        select: "-__v",
        populate: [
          {
            path: "usuarioregistro",
            select: "-__v -password",
            populate: { path: "usuario", select: "-__v" },
          },
          {
            path: "datoanimal",
            select: "-__v",
          },
        ],
        sort: { createdAt: -1 },
        page: page,
        limit: limit,
      }
    )
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(404).send({
          message: err.message,
        });
      });
  }

  static findById(req, res) {
    let pk = req.params.id;
    Publicacion.findById(pk, { __v: 0 })
      .populate({
        path: "usuarioregistro",
        select: "-__v -password",
        populate: { path: "usuario", select: "-__v" },
      })
      .populate({
        path: "datoanimal",
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

  static findbyUser(req, res) {
    let iduser = req.params.iduser;
    Publicacion.find({ usuarioregistro: iduser, eliminado: null }, { __v: 0 })
      .populate({
        path: "usuarioregistro",
        select: "-__v -password",
        populate: { path: "usuario", select: "-__v" },
      })
      .populate({
        path: "datoanimal",
        select: "-__v",
      })
      .sort({ createdAt: -1 })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(404).send({
          message: err.message,
        });
      });
  }

  static updatePublicacion(req, res) {
    let usuario_pk = res.locals.payload.id;
    let pk = req.params.id;
    let data = req.body;

    Publicacion.findById(pk).then((publicacion) => {
      if(publicacion.usuarioregistro == usuario_pk){
        if (data.animal == undefined || data.animal == null || data.animal == ""){
          Publicacion.findByIdAndUpdate(pk, data).then(() => {
            res.send("Datos actualizados")
          }).catch((err) => {
            res.status(500).send({
              message: err.message,
            });
          });;
        } else {
          let pka = publicacion.datoanimal;
          Animal.findByIdAndUpdate(pka, data.animal)
            .then((datos) => {
              data.animal = pka;
              Publicacion.findByIdAndUpdate(pk, data)
                .then((dato) => {
                  res.send("Datos actualizados");
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
      } else {
        res.status(401).send({
          message: "No puede editar esta publicación",
        });
      }
    }).catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });

  }



  static safeDelete(req, res) {
    let usuario_pk = res.locals.payload.id;
    let pk = req.params.id;

    let data = {
      eliminado: true,
      fecha_eliminado: new Date(),
    };

    Publicacion.findById(pk).then(publicacion => {
      if(publicacion.usuarioregistro == usuario_pk){
        Publicacion.findByIdAndUpdate(pk, data).then(datos => {
          let pka = datos.datoanimal;
          Animal.findByIdAndUpdate(pka,data).then(() => {
            res.send("Publicación eliminada")
          }).catch((err) => {
            res.status(500).send({
              message: err.message,
            });
          });
        }).catch((err) => {
          res.status(500).send({
            message: err.message,
          });
        });
      } else {
        res.status(400).send({
          message: "No puede eliminar esta publicación"
        })
      }

    }).catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });

    
  }
  

}

module.exports = { PublicacionController };
