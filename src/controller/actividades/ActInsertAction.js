const BuilderJsonresponse = require("../../lib/BuilderJsonResponse");
const DbMongo = require("../../model/DbMongo");


let listaCamposPermitirInsert = [
  'tipo',
  'titulo',
  'fecha',
  'idGrupo',
  'comentarios'
];


const ActInsertAction = {

  getListaCamposAllowInsert: () => {
    return listaCamposPermitirInsert;
  },
  run: async (res, dataInsert) => {

    const idGrupo = dataInsert.idGrupo;

    const grupo = await DbMongo.Grupos
        .findById(idGrupo, {alumnos: 1})
        .exec()
    ;

    const alumnos = grupo.alumnos;

    dataInsert.alumnos = [];

    alumnos.forEach(a => {
      dataInsert.alumnos.push({
        id: a.id,
        nombre: a.nombre,
        apellidos: a.apellidos,
        calificacion: null
      });
    });

    const actividadNew = await DbMongo.Actividades.create(dataInsert);

    const dataRespuesta = {
      _id: actividadNew._id
    };

    BuilderJsonresponse.Success(res,dataRespuesta);

  }
};

module.exports = ActInsertAction;
