const BuilderJsonresponse = require("../../lib/BuilderJsonResponse");
const DbMongo = require("../../model/DbMongo");


const GrupoIndexAction = {

  run: (res) => {


    const promTotal = DbMongo.Grupos.countDocuments({});
    const promItems = DbMongo.Grupos
        .find({},
            {
              nombre: 1,
              materia: 1,
              escuela: 1,
              tag_escuela: 1,
              ciclo: 1,
              comentarios: 1
            })
        .sort({nombre: 'desc'})
        .exec()
    ;


    Promise.all([promTotal, promItems])
        .then((values) => {
          const total = values[0];
          const items = values[1];


          let data = {
            total,
            items,
            next: ''
          };

          BuilderJsonresponse.Success(res, data);

        }).catch(error => {

      BuilderJsonresponse.Error(res, error);
    });


  }
};

module.exports = GrupoIndexAction;
