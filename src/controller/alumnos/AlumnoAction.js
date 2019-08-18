const BuilderJsonresponse = require("../../lib/BuilderJsonResponse");
const DbMongo = require("../../model/DbMongo");
const LibAlumnos = require("./LibAlumnos");
const uniqid = require("uniqid");


const runAction = (res, idGrupo, idAlumno, dataAlumno, fnUpdate) => {

  const dataResponse = {
    _id: idGrupo
  };

  DbMongo.Grupos
      .findById(idGrupo, {alumnos: 1})
      .then((data) => {

        const alumnos = data.alumnos;

        fnUpdate(alumnos, idAlumno, dataAlumno, dataResponse);

        LibAlumnos.sort(alumnos);

        return DbMongo.Grupos.findByIdAndUpdate(idGrupo, {$set: {alumnos}}, {
          new: false, upsert: false
        });

      })
      .then(data => {
        BuilderJsonresponse.Success(res, dataResponse);
      })
      .catch(error => {
        BuilderJsonresponse.Error(res, error);
      });
};


const AlumnoAction = {

  runInsert: (res, idGrupo, alumnoNew) => {


    let dataResponse = {};

    const fnUpdate = (alumnos, idAlumno, dataAlumno, dataResponse) => {

      /*crar un ID del Alumnmos*/
      dataAlumno.id = uniqid();

      alumnos.push(dataAlumno);

      dataResponse.idAlumno = dataAlumno.id;
    };

    runAction(res, idGrupo, null, alumnoNew, fnUpdate);

  },

  runDelete: (res, idGrupo, idAlumno) => {


    let dataResponse = {};

    const fnUpdate = (alumnos, idAlumno, dataAlumno, dataResponse) => {

      let index = alumnos.findIndex(a => {
        return a.id === idAlumno;
      });

      if (index === -1) {
        throw new Error("No se encontró el alumno con id " + idAlumno);
      }

      alumnos.splice(index, 1);

      dataResponse.idAlumno = idAlumno;
    };

    runAction(res, idGrupo, idAlumno, null, fnUpdate);

  },

  runUpdate: (res, idGrupo, idAlumno, dataAlumno) => {


    let dataResponse = {};

    const fnUpdate = (alumnos, idAlumno, dataAlumno, dataResponse) => {

      let index = alumnos.findIndex(a => {
        return a.id === idAlumno;
      });

      if (index === -1) {
        throw new Error("No se encontró el alumno con id " + idAlumno);
      }

      alumnos[index].nombre = dataAlumno.nombre;
      alumnos[index].apellidos = dataAlumno.apellidos;
      alumnos[index].comentarios = dataAlumno.comentarios;

      dataResponse.idAlumno = idAlumno;

    };

    runAction(res, idGrupo, idAlumno, dataAlumno, fnUpdate);

  }


};

module.exports = AlumnoAction;
