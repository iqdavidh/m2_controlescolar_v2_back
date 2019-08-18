const BuilderJsonresponse = require("../../lib/BuilderJsonResponse");
const DbMongo = require("../../model/DbMongo");


const GrupoFindByIDAction = {

  run: (res, id) => {

    const promGrupo = DbMongo.Grupos
        .findById(id)
        .exec()
    ;

    promGrupo
        .then((grupo) => {

          BuilderJsonresponse.Success(res, grupo);

        }).catch(error => {

      BuilderJsonresponse.Error(res, error);
    });


  }
};

module.exports = GrupoFindByIDAction;
