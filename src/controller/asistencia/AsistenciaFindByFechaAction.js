const BuilderJsonresponse = require("../../lib/BuilderJsonResponse");
const DbMongo = require("../../model/DbMongo");
const ProAsistencia = require("./proceso/ProAsistencia");


const AsistenciaFindByFechaAction = {

  run: (res, idGrupo, fechaYMD) => {


    const promGrupo = DbMongo.Grupos.findById(idGrupo, {alumnos: 1});
    const promAsistencia = DbMongo.Asistencia
        .find({
          fecha: {"$eq":fechaYMD},
          idGrupo: {"$eq":idGrupo},
        })
        .exec()
    ;


    Promise.all([promGrupo, promAsistencia])
        .then((values) => {

          const grupo = values[0];
          let asistencia = values[1];

          let alumnos=[];

          if (asistencia.length === 0) {

            grupo.alumnos
                .forEach(a => {
                  alumnos.push(
                      {id: a.id, valor: 1, nombre:a.nombre, apellidos:a.apellidos}
                  );
                });
          }else{
            alumnos=asistencia[0].alumnos;
          }

          let data = {
            total:1,
            alumnos: alumnos,
            fechas: [],
            next: ''
          };

          data.fechas.push(ProAsistencia.GetDataFecha(fecha));

          BuilderJsonresponse.Success(res, data);

        }).catch(error => {

      BuilderJsonresponse.Error(res, error);
    });


  }
};

module.exports = AsistenciaFindByFechaAction;
