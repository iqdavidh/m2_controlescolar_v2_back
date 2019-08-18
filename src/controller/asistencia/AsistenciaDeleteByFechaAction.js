const BuilderJsonresponse = require("../../lib/BuilderJsonResponse");
const DbMongo = require("../../model/DbMongo");


const AsistenciaDeleteByFechaAction = {

  run: (res, idGrupo, fecha) => {

    const filter={
      idGrupo,
      fecha
    };

    const promGrupo = DbMongo.Asistencia
        .findOneAndRemove(filter)
        .then((values) => {

          BuilderJsonresponse.Success(res, filter);

        }).catch(error => {

      BuilderJsonresponse.Error(res, error);
    });


  }
};

module.exports = AsistenciaDeleteByFechaAction;
