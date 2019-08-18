const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ActividadesSchema = new Schema({
  idGrupo: {type: String,require:true},
  tipo: {type: String,require:true},
  titulo: {type: String,require:true},
  fecha: {type: String, require:true},
  alumnos: {type:Array, required: true},
  comentarios:{type: String},

});

module.exports = mongoose.model('actividades', ActividadesSchema);
