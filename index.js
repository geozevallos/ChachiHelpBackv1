const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')

const { DistritoController } = require('./controllers/distritos_controller');
const { UsuarioController } = require('./controllers/usuarios_controller');
const { VeterinariaController } = require('./controllers/veterinarias_controller');
const { PublicacionController } = require('./controllers/publicacion_controller');
const { DepartamentoController } = require('./controllers/departamentos_controller');
const { ProvinciaController } = require('./controllers/provincia_controller');

const app = express();

app.use(cors())

app.use(bodyParser.json());


// Ubicacion
app.get('/departamentos', DepartamentoController.findAll)
app.get('/provincias/:iddpto', ProvinciaController.findByIdDpto)
app.get('/distritos/:idprov', DistritoController.findByIdProv)


// usuarios
app.post('/usuario', UsuarioController.post)
app.get('/usuarios', UsuarioController.findAll)
app.get('/usuario/:id', UsuarioController.findById)
app.put('/usuario/:id', UsuarioController.update)
app.delete('/usuario/:id', UsuarioController.safeDelete)


// Veterinarias
app.get('/veterinarias', VeterinariaController.get)
app.get('/vetnear', VeterinariaController.findNear)

//publicacion
app.post('/publicacion', PublicacionController.Crear)

app.listen(7100, () => {
    console.log('server running at localhost:7100');
})