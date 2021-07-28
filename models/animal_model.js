const mongoose = require("mongoose");

var AnimalSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  edad: {
    type: String,
    required: true,
  },
  tamanio: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  especie: {
    type: String,
    required: true,
  },
  raza: {
    type: String
  },
  sexo: {
    type: String,
    required: true,
  },
  eliminado: {
    type: Boolean,
  },
  fecha_elim: {
    type: Date,
  }
});

const Animal = mongoose.model("animal", AnimalSchema);

module.exports = {
  Animal,
};
