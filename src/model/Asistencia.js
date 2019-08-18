const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const AsistenciaSchema = new Schema({
  idGrupo: {type: String,require:true},
  fecha: {type: String, require:true},
  alumnos: {type:Array, required: true}

});

module.exports = mongoose.model('asistencias', AsistenciaSchema);
