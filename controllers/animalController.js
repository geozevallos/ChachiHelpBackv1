const { Animal } = require("../models/animal_model");
const { Publicacion } = require("../models/publicacion_model");

class AnimalController {
  // {"tamanio": "mediano", "color": "negro", "sexo": "Masculino"}

//   static findAnimal(req, res) {
//     let consulta = req.body;
//     Animal.find(consulta)
//       .then((data) => {
//         let cant_datos = data.length;
//         if (cant_datos == 0) {
//           res.send("No se encontraron datos");
//         } else {
//           let id_animal = [];
//           data.forEach((animal) => {
//             id_animal.push(animal.id);
//           });

//           let rpta = [];
//           id_animal.forEach((id) => {
//             Publicacion.findOne({ datoanimal: id }, { __v: 0 })
//               .populate({
//                 path: "usuarioregistro",
//                 select: "-__v -password",
//                 populate: { path: "usuario", select: "-__v" },
//               })
//               .populate({
//                 path: "datoanimal",
//                 select: "-__v",
//               })
//               .then((data) => {
//                 rpta.push(data);
//                 if (rpta.length == cant_datos) {
//                   res.send(rpta);
//                 }
//               })
//               .catch((err) => {
//                 res.status(404).send({
//                   message: err.message,
//                 });
//               });
//           });
//         }
//       })
//       .catch((err) => {
//         res.status(404).send({
//           message: err.message,
//         });
//       });
//   }


  static findAnimal(req, res) {
    let pubtype = req.body.tipopub
    let consulta = req.body.animal;

    Animal.find(consulta)
      .then((data) => {
        let cant_datos = data.length;
        if (cant_datos == 0) {
          res.send("No se encontraron datos");
        } else {
          let id_animal = [];
          data.forEach((animal) => {
            id_animal.push(animal.id);
          });

          let rpta = [];
          let ndatos = 0
          id_animal.forEach((id) => {
            Publicacion.find({ datoanimal: id, tipopub:pubtype, eliminado: null}, { __v: 0 })
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
                  if (data.length == 0){
                      res.send("Sin Dato");
                  } else {
                      rpta.push(data[0]);
                  }

                  ndatos = ndatos + 1

                  if (ndatos == cant_datos){
                      res.send(rpta)
                  }
              })
              .catch((err) => {
                res.status(404).send({
                  message: err.message,
                });
              });
          });
        }
      })
      .catch((err) => {
        res.status(404).send({
          message: err.message,
        });
      });
  }



}

module.exports = { AnimalController };
