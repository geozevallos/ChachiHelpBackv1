
class ImagenController{
    
    static uploadImage(req, res){
        let imgdata = req.file;
        let path = `/img/uploads/${imgdata.filename}`
        console.log(path);
        res.send({
            'path': path
        })
    }

}


module.exports = { ImagenController };