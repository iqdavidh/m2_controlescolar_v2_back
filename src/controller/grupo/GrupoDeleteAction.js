const BuilderJsonresponse = require("../../lib/BuilderJsonResponse");
const DbMongo = require("../../model/DbMongo");


const GrupoDeleteAction = {

  run: (res, id) => {


    const promDeleteGrupo = DbMongo.Grupos
        .findByIdAndRemove(id)
        .exec();


    Promise.all([promDeleteGrupo])
        .then((data) => {

          BuilderJsonresponse.Success(res, {_id: id});

        }).catch(error => {

      BuilderJsonresponse.Error(res, error);
    });


  }
};

module.exports = GrupoDeleteAction;
