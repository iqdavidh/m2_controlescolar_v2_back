const BuilderJsonresponse = require("../../lib/BuilderJsonResponse");
const DbMongo = require("../../model/DbMongo");


let listaCamposPermitirUpdate = [
  'nombre', 'escuela',
  'materia', 'ciclo',
  'ymini', 'ymfin',
  'comentarios'
];


const GrupoUpdateAction = {

  getListaCamposAllowUpdate: () => {
    return listaCamposPermitirUpdate;
  },
  run: (res, id, dataUpdate) => {

    const promUpdate = DbMongo.Grupos.findByIdAndUpdate(id, {$set: dataUpdate} , {
      new: false,upsert: false
    });

    promUpdate
        .then((item) => {

          const data={
            _id : id
          };

          BuilderJsonresponse.Success(res, data);

        }).catch(error => {

      BuilderJsonresponse.Error(res, error);
    });


  }
};

module.exports = GrupoUpdateAction;
