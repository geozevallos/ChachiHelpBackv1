const mongoose = require("mongoose");

// Esquema para usuarios
var UsuarioSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellidos: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  tipoDocumento: {
    type: String,
  },
  documento: {
    type: String,
  },

  departamento: {
    type: String,
  },
  provincia: {
    type: String,
  },
  distrito: {
    type: String,
  },
  celular: {
    type: String,
  },
  telefono: {
    type: String,
  },
  eliminado: {
    type: Boolean,
  },
  fecha_elim: {
    type: Date,
  },
  fecha_creacion: {
    type: Date,
  },
  // guardado:
  // guardado:
  //     [{
  //         type: mongoose.Schema.Types.ObjectId,
  //         ref: 'nombredelotroschema'
  //     }]

  // profile: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'profile'
  // },
  // logs: [
  //     {
  //         type: mongoose.Schema.Types.ObjectId,
  //         ref: 'authlogger'
  //     }
  // ]
});

const Usuario = mongoose.model("usuario", UsuarioSchema);

module.exports = {
  Usuario,
};
