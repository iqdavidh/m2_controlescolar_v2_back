const BuilderJsonresponse = require("../../lib/BuilderJsonResponse");
const DbMongo = require("../../model/DbMongo");


let listaCamposPermitirUpdate = [
  'tipo', 'titulo',  'fecha', 'comentarios'
];


const ActUpdateCalificacionesAction = {

  getListaCamposAllowUpdate: () => {
    return listaCamposPermitirUpdate;
  },
  run: (res, id, dataCalificaciones) => {

    const dataUpdate={alumnos:dataCalificaciones};

    const promUpdate = DbMongo.Actividades.findByIdAndUpdate(id, {$set: dataUpdate} , {
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

module.exports = ActUpdateCalificacionesAction;
