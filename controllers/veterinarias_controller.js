const { Veterinaria } = require("../db");



class VeterinariaController{
    static get(req, res){
        Veterinaria.find()
            .then(data => {
                res.send(data)
            }).catch(err => {
                res.status(404).send({
                    message: err.message
                })
            })
    }

    // localhost:7100/vetnear?long=-76.9782623&lat=-12.1519949&maxdist=500
    static findNear(req, res){
        let long = +req.query.long;
        let lat = +req.query.lat
        let maxdist = +req.query.maxdist
        let coords = [long, lat]
        Veterinaria.find().near('geometry', {center: {type: 'Point', coordinates: coords}, maxDistance: maxdist}).then(data => {
            res.send(data);
        }).catch(err => {
            res.status(404).send({
                message: err
            })
        })

    }
}

// query.where('loc').near({ center: [10, 10], maxDistance: 5 });
// query.near('loc', { center: [10, 10], maxDistance: 5 })
// Distrito.find({}).where('geometry').intersects().geometry({type: 'Point', coordinates: coords})

module.exports = {VeterinariaController}


