const BuilderJsonresponse = require("../../lib/BuilderJsonResponse");
const DbMongo = require("../../model/DbMongo");
const ProAsistencia = require("./proceso/ProAsistencia");
const ProCrearTablaAsistencia = require("./proceso/ProCrearTablaAsistencia");


const AsistenciaPaginaAction = {

  run: (res, idGrupo, pagina) => {

    const itemsXPage = 7;

    const promTotal = DbMongo.Asistencia.countDocuments({idGrupo});
    const promItems = DbMongo.Asistencia
        .find({idGrupo})
        .limit(itemsXPage)
        .skip(itemsXPage * (pagina - 1))
        .sort({fecha: 'desc'})
        .exec()
    ;

    Promise.all([promTotal, promItems])
        .then((values) => {

          const total = values[0];
          const listaAsistencia = values[1];

          const tabla = ProCrearTablaAsistencia.exe(listaAsistencia);

          const totalPaginas =  Math.ceil( total / itemsXPage);

          //fechas.reverse();  <-- no es toy seguro si se debe reverse


          let data = {
            total,
            totalPaginas,
            pagina,
            alumnos: tabla.alumnos,
            fechas: tabla.fechas,
            next: ''
          };

          BuilderJsonresponse.Success(res, data);

        })
        .catch(error => {

          BuilderJsonresponse.Error(res, error);
        });


  }
};

module.exports = AsistenciaPaginaAction;
