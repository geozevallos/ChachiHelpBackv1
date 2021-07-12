const { Publicacion } = require("../models/publicacion_model")

class PublicacionController{


    // {
    //     "titulo": "Perro perdido",
    //     "idtipopub": "01",
    //     "imagen": "imagen.png",
    //     "descripcion": "Perro perdido de color tal tal tal tal tal",
    //     "ubicacion_ref": "Se perdió cerca a ciudad de Dios",
    //     "localizacion" : {
    //         "type" : "Point",
    //         "coordinates" : [
    //             -77.06811629087467,
    //             -11.986777286151154
    //         ]
    //     }
    // }

    static Crear(req, res){
        let json_data = req.body

        const nueva_pub = new Publicacion(json_data)

        nueva_pub.save().then(data => {
            res.send(data)
        }).catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
    }


}

module.exports = { PublicacionController }