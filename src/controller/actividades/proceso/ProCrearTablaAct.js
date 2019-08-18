const LibFecha = require("../../../lib/LibFecha");

const ProCrearTablaAct = {
  exe: (listaAct) => {


    const alumnosEnLista = [];
    const actEnLista = [];

    listaAct.forEach(act => {


      const fechaYMD = act.fecha;
      const fechaDMY= LibFecha.fechaYMDtoDMY(fechaYMD);

      const d= LibFecha.getDateFromFechaYMD(fechaYMD);

      actEnLista.push({
        _id: act._id,
        tipo: act.tipo,
        titulo: act.titulo,
        fechaDMY: fechaDMY,
        fechaAbb: LibFecha.dateToFechaAbb(d)
      });

      //buscar todos los alumnos
      act.alumnos.forEach(alumno => {

        let id = alumno.id;

        let indexAlumno = alumnosEnLista
            .findIndex(item => {
              return item.id === id;
            });

        if (indexAlumno === -1) {
          alumnosEnLista.push({
            id: alumno.id,
            nombre: alumno.nombre,
            apellidos: alumno.apellidos,
            act: []
          });
        }
      });

    });

    alumnosEnLista
        .sort((a, b) => {

          if (a.apellidos === b.apellidos) {

            if (a.nombre === b.nombre) {
              return 0;
            }

            if (a.nombre > b.nombre) {
              return 1;
            } else {
              return -1;
            }

          }

          if (a.apellidos > b.apellidos) {
            return 1;
          } else {
            return -1;
          }

        })
    ;


    alumnosEnLista.forEach(alumno => {

      let idAlumno = alumno.id;


      listaAct.forEach(act => {

        let actAlumno = null;


        const actEncontrada = act.alumnos.find(a => {
          return a.id === idAlumno;
        });

        if (actEncontrada === undefined) {
          actAlumno = {
            _id: act._id,
            calificacion: null
          };
        } else {
          actAlumno = {
            _id: act._id,
            calificacion: actEncontrada.calificacion
          };
        }

        alumno.act.push(actAlumno);

      });

    });


    const respuesta = {
      alumnos: alumnosEnLista,
      actividades: actEnLista
    };

    return respuesta;
  }
};

module.exports = ProCrearTablaAct;
