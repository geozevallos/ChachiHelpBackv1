const { Distrito } = require("../db")
const { Animal } = require("../models/animal_model")
const { Publicacion } = require("../models/publicacion_model")

class PublicacionController{

/**
 * 
 * 
 
    {
        "titulo": "Perro perdido",
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


    static Crear(req, res){
        let usuario_pk = res.locals.payload.id
        let coords = req.body.localizacion.coordinates
        let publicacion_data = req.body
        let animaldata = req.body.animal

        let nuevoAnimal = new Animal(animaldata);

        nuevoAnimal.save().then(data => {
            publicacion_data.usuarioregistro = usuario_pk
            publicacion_data.datoanimal = data._id
            Distrito.find({}).where('geometry').intersects().geometry({type: 'Point', coordinates: coords})
            .then(data => {
                let datos = data[0].toObject();
                let dep = datos.properties.DEPARTAMEN
                let prov = datos.properties.PROVINCIA
                let dist = datos.properties.DISTRITO

                publicacion_data.departamento = dep
                publicacion_data.provincia = prov
                publicacion_data.distrito = dist


                const nueva_publicacion = new Publicacion(publicacion_data)

                nueva_publicacion.save().then(data =>{
                    res.send(data)
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

        console.log(nuevoAnimal)
    }

    // localhost:7100/publicaciones?long=-76.9782623&lat=-12.1519949&maxdist=500
    static findNearMe(req, res){
        let long = +req.query.long;
        let lat = +req.query.lat
        let maxdist = +req.query.maxdist
        let coords = [long, lat]

        Publicacion.find()
            .near('localizacion', {center: {type: 'Point', coordinates:coords}, maxDistance: maxdist})
            .populate({
                path: 'usuarioregistro',
                select: '-__v -password',
                populate: {path: 'usuario', select: '-__v'}
            })
            .populate({
                path: 'datoanimal',
                select: '-__v',
            })
            .then(data => {
                res.send(data)
            }).catch(err => {
                res.status(404).send({
                    message: err
                })
            })
    }

    static findAll(req,res){
        Publicacion.find()
        .select('-__v')
        .populate({
            path: 'usuarioregistro',
            select: '-__v -password',
            populate: {path: 'usuario', select: '-__v'}
        })
        .populate({
            path: 'datoanimal',
            select: '-__v',
        })
        .then(data => {
            res.send(data)
        }).catch(err => {
            res.status(404).send({
                message: err.message
            })
        })
    }

    static findById(req, res){
        let pk = req.params.id;
        Publicacion.findById(pk, {__v:0}).populate({
            path: 'usuarioregistro',
            select: '-__v -password',
            populate: {path: 'usuario', select: '-__v'}            
        }).populate({
            path: 'datoanimal',
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


    static findbyUser(req, res){
        let iduser = req.params.iduser;
        Publicacion.find({ usuarioregistro: iduser }, {__v:0})
        .populate({
            path: 'usuarioregistro',
            select: '-__v -password',
            populate: {path: 'usuario', select: '-__v'}            
        })
        .populate({
            path: 'datoanimal',
            select: '-__v'            
        })
        .then(data => {
            res.send(data)
        }).catch(err => {
            res.status(404).send({
                message: err.message
            })
        })
    }


}

module.exports = { PublicacionController }