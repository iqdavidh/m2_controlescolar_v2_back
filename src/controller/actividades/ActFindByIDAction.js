const BuilderJsonresponse = require("../../lib/BuilderJsonResponse");
const DbMongo = require("../../model/DbMongo");

const ActFindByIDAction = {

  run: (res, id) => {

    const promAct = DbMongo.Actividades
        .findById(id)
        .exec()
    ;

    promAct
        .then((act) => {

          BuilderJsonresponse.Success(res, act);

        }).catch(error => {

      BuilderJsonresponse.Error(res, error);
    });
  }
};

module.exports = ActFindByIDAction;
