'use strict';


const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const GrupoSchema = new Schema({
  nombre: {type: String, required: true},
  escuela: {type: String},
  tag_escuela: {type: String},
  materia: {type: String, required: true},
  ciclo: {type: String},

  ymini: {type: Number},
  ymfin: {type: Number},

  comentarios: {type: String},
  alumnos: {type:Array, required: true}

});

module.exports = mongoose.model('grupos', GrupoSchema);
