const BuilderJsonresponse = require("../../lib/BuilderJsonResponse");
const DbMongo = require("../../model/DbMongo");



const AsistenciaUpdateByFechaAction = {

  run: (res, idGrupo, fechaYMD, alumnos) => {

    const filter = {
      idGrupo: idGrupo,
      fecha: fechaYMD
    };

    const update = {
      $set : {alumnos: alumnos}
    };


    DbMongo.Asistencia
        .findOneAndUpdate(filter, update, {upsert: true, new:true})
        .then((item) => {

          const data = {
            idGrupo: idGrupo
          };

          if(item){
            if(item._id){
              data._id=item._id;
            }
          }

          BuilderJsonresponse.Success(res, data);

        }).catch(error => {

      BuilderJsonresponse.Error(res, error);

    });


  }
};

module.exports = AsistenciaUpdateByFechaAction;
