const BuilderJsonresponse = require("../../lib/BuilderJsonResponse");
const DbMongo = require("../../model/DbMongo");

const ActDeleteAction = {
  run: (res, idActividad) => {

    const promDeleteAct = DbMongo.Actividades
        .findByIdAndRemove(idActividad)
        .exec();

    Promise.all([promDeleteAct])
        .then((data) => {

          BuilderJsonresponse.Success(res, {_id: idActividad});

        }).catch(error => {

      BuilderJsonresponse.Error(res, error);
    });

  }
};


module.exports = ActDeleteAction;
