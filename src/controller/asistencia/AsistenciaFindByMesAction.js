const BuilderJsonresponse = require("../../lib/BuilderJsonResponse");
const DbMongo = require("../../model/DbMongo");
const ProCrearTablaAsistencia = require("./proceso/ProCrearTablaAsistencia");



const AsistenciaFindByMesAction = {

  run: (res, idGrupo, y, m) => {


    let mFin = m + 1;
    let yFin = y;

    if (mFin > 12) {
      yFin++;
      mFin = 1;
    }
    m= (m<10?'0':'') + m.toString();
    const fIni = `${y}-${m}-01`;
    const fFin = `${yFin}-${mFin}-01`;

    const promGrupo = DbMongo.Grupos.findById(idGrupo, {alumnos: 1});

    const promAsistencia = DbMongo.Asistencia
        .find(
            {
              idGrupo: idGrupo,
              fecha: {$gte: fIni, $lt: fFin}
            })
        .sort({fecha: 1})
        .exec()
    ;


    Promise.all([promGrupo, promAsistencia])
        .then((values) => {

          const grupo = values[0];
          let listaAsistencia = values[1];


          const tabla = ProCrearTablaAsistencia.exe(listaAsistencia);


          let dataRespuesta = {
            total: listaAsistencia.length,
            alumnos: tabla.alumnos,
            fechas: tabla.fechas,
            next: ''
          };




          BuilderJsonresponse.Success(res, dataRespuesta);

        }).catch(error => {

      BuilderJsonresponse.Error(res, error);
    });


  }
};

module.exports = AsistenciaFindByMesAction;
