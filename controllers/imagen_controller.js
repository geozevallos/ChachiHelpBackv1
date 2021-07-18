
class ImagenController{
    
    static uploadImage(req, res){
        let imgdata = req.file;
        let path = `/img/uploads/${imgdata.filename}`
        console.log(path);
        res.send({
            'path': path
        })
    }

    static uploadMultipleImages(req, res){
        let fotos = req.files

        let ruta_imagenes = []
        fotos.forEach(foto => {
            let imagen = {'path': `/img/uploads/${foto.filename}`}
            ruta_imagenes.push(imagen);
        });
        res.send(ruta_imagenes)
    }

}


module.exports = { ImagenController };