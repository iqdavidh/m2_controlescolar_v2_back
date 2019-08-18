const BuilderJsonresponse = require("../../lib/BuilderJsonResponse");
const DbMongo = require("../../model/DbMongo");


let listaCamposPermitirInsert = [
  'nombre', 'escuela',
  'materia', 'ciclo',
  'ymini', 'ymfin',
  'comentarios'
];


const GrupoInsertAction = {

  getListaCamposAllowInsert: () => {
    return listaCamposPermitirInsert;
  },
  run: (res, dataInsert) => {

    dataInsert.alumnos = [];

    const prom = DbMongo.Grupos
        .create(dataInsert)
        .then((item) => {

          const data = {_id:item._id};

          BuilderJsonresponse.Success(res, item);

        }).catch(error => {

          BuilderJsonresponse.Error(res, error);
        });


  }
};

module.exports = GrupoInsertAction;
