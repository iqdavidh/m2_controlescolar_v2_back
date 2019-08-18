const LibValidacion = require("../../../lib/LibValidacion");
const LibTexto = require("../../../lib/LibTexto");

const listaCamposAllow = ['apellidos', 'nombre'];

const ProDatosAlumnos = {
  getDataClean: (dataRaw) => {

    let dataClean = LibValidacion.getDataClean(dataRaw, listaCamposAllow);

    dataClean.comentarios=dataRaw.comentarios;

    listaCamposAllow.forEach(c=>{
      dataClean[c]=LibTexto.Ucfirst( dataClean[c]);
    });

    return dataClean;
  }
};


module.exports = ProDatosAlumnos;
