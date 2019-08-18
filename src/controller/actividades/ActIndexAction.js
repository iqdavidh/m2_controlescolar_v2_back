const BuilderJsonresponse = require("../../lib/BuilderJsonResponse");
const DbMongo = require("../../model/DbMongo");
const LibFecha = require("../../lib/LibFecha");


const ActIndexAction = {
  run: (res, idGrupo) => {


    const promListaAct = DbMongo
        .Actividades
        .find({idGrupo}, {titulo: 1, fecha: 1})
        .sort({fecha: 'desc'})
        .exec()
    ;

    Promise.all([promListaAct])
        .then((values) => {

          const lista = values[0];
          let listaActividades = [];

          lista.forEach(a => {

            let d = LibFecha.getDateFromFechaYMD(a.fecha);

            listaActividades.push({
              _id: a._id,
              titulo: a.titulo,
              fecha: a.fecha,
              fechaAbb: LibFecha.dateToFechaAbb(d)
            });
          });

          let data = {
            total: listaActividades.length,
            actividades: listaActividades
          };

          BuilderJsonresponse.Success(res, data);
        })
        .catch(error => {
          BuilderJsonresponse.Error(res, error);
        });

  }
};

module.exports = ActIndexAction;
