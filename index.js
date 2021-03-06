const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
const multer  = require('multer')

const { DistritoController } = require('./controllers/distritos_controller');
const { UsuarioController } = require('./controllers/usuarios_controller');
const { VeterinariaController } = require('./controllers/veterinarias_controller');
const { PublicacionController } = require('./controllers/publicacion_controller');
const { DepartamentoController } = require('./controllers/departamentos_controller');
const { ProvinciaController } = require('./controllers/provincia_controller');
const { RegistroController } = require('./controllers/registro_controller');

const authmiddleware = require('./middlewares/jwt_atenticacion');
const { ImagenController } = require('./controllers/imagen_controller');
const validateToken = require('./middlewares/validate');
const { AnimalController } = require('./controllers/animalController');
const { RazaController } = require('./controllers/razaController');
const { get } = require('http');

dotenv.config();

const app = express();


// static files
// Esta sería la URL: http://localhost:7100/img/uploads/1626503101235-images.jpg
app.use(express.static(path.join(__dirname, 'public')));


app.use(cors())
// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


const storage =  multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb, filename)=>{
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

// app.use(multer({storage: storage}).single('avatar'))
var upload = multer({storage: storage})




// Ubicacion
app.get('/departamentos', DepartamentoController.findAll)
app.get('/provincias/:iddpto', ProvinciaController.findByIdDpto)
app.get('/distritos/:idprov', DistritoController.findByIdProv)

//Cargar imagen
app.post('/uploadimage', upload.single('avatar'),ImagenController.uploadImage)
app.post('/uploadimages', upload.array('fotos', 3),ImagenController.uploadMultipleImages)

app.get('/getimages', ImagenController.getImages)


// usuarios
app.post('/registro', UsuarioController.registro)
app.get('/registros', RegistroController.findAll)
app.get('/registro/:id', RegistroController.findById)
// Update Registro del usuario
app.put('/registro/:id', authmiddleware, UsuarioController.update)


// Add publicacion al registro de guardados
app.put('/addguardado/:id', authmiddleware, RegistroController.addGuardados)

// Obtener mis publicaciones guardadas
app.get('/getguardados', authmiddleware, RegistroController.showGuardados)

//Eliminarpublicacion guardada
app.delete('/deleteguardado/:id', authmiddleware, RegistroController.removeGuardado)


//Obtener razas por especies
app.get('/razas/:idesp', RazaController.getRazas)


// No funcionando
app.get('/usuarios', UsuarioController.findAll)
app.get('/usuario/:id', UsuarioController.findById)
app.delete('/usuario/:id', UsuarioController.safeDelete)

// login
app.post('/auth', RegistroController.auth)

// Validate
app.get('/validate', validateToken)


// Veterinarias
app.get('/veterinarias', VeterinariaController.get)
app.get('/vetnear', VeterinariaController.findNear)


//publicacion
app.post('/publicacion', authmiddleware, PublicacionController.Crear)
app.get('/publicacionescerca', PublicacionController.findNearMe)
app.get('/publicaciones', PublicacionController.findAll)
app.get('/publicacion/:id', PublicacionController.findById)
app.get('/publicacionbyuser/:iduser', PublicacionController.findbyUser)
app.get('/publicacionbytype/:idtype', PublicacionController.findByType)

app.put('/publicacion/:id', authmiddleware, PublicacionController.updatePublicacion)

app.delete('/publicacion/:id', authmiddleware, PublicacionController.safeDelete)


//Query Animal
app.get('/animal/query', AnimalController.findAnimal)



app.listen(7100, () => {
    console.log('server running at localhost:7100');
})