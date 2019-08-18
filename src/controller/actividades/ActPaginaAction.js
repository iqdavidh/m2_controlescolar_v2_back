const BuilderJsonresponse = require("../../lib/BuilderJsonResponse");
const DbMongo = require("../../model/DbMongo");
const ProAsistencia = require("../asistencia/proceso/ProAsistencia");
const ProCrearTablaAct = require("./proceso/ProCrearTablaAct");

const ActPaginaAction = {
  run: (res, idGrupo, pagina) => {


    const itemsXPage = 7;

    const promTotal = DbMongo.Actividades.countDocuments({idGrupo});
    const promListaAct = DbMongo.Actividades
        .find({idGrupo})
        .limit(itemsXPage)
        .skip(itemsXPage * (pagina - 1))
        .sort({fecha: 'desc'})
        .exec()
    ;

    Promise.all([promTotal, promListaAct])
        .then((values) => {

          const total = values[0];
          const listaActividades = values[1];


          const tabla = ProCrearTablaAct.exe(listaActividades);
          const totalPaginas =  Math.ceil( total / itemsXPage);

          let data = {
            total,
            totalPaginas,
            pagina,
            alumnos: tabla.alumnos,
            actividades: tabla.actividades,
            next: ''
          };

          BuilderJsonresponse.Success(res, data);

        })
        .catch(error => {

          BuilderJsonresponse.Error(res, error);
        });


  }
};

module.exports = ActPaginaAction;
