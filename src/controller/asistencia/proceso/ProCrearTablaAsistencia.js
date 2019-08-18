const LibFecha = require("../../../lib/LibFecha");

const ProCrearTablaAsistencia = {
  exe: (listaAsistencia) => {


    const alumnosEnLista = [];
    const fechasEnLista = [];

    listaAsistencia.forEach(asistencia => {


      const fechaYMD = asistencia.fecha;
      const fechaDMY= LibFecha.fechaYMDtoDMY(fechaYMD);

      const d= LibFecha.getDateFromFechaYMD(fechaYMD);

      fechasEnLista.push({
        fechaDMY: fechaDMY,
        fechaAbb: LibFecha.dateToFechaAbb(d),
        dia: d.getDay()
      });

      //buscar todos los alumnos
      asistencia.alumnos.forEach(alumno => {

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
            asistencia: []
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

      listaAsistencia.forEach(asistencia => {

        let asistenciaEnFecha = null;

        const fechaYMD = asistencia.fecha;
        const fechaDMY = LibFecha.fechaYMDtoDMY(fechaYMD);


        const afecha =  asistencia.alumnos.find(a => {
          return a.id === idAlumno;
        });

        if (afecha === undefined) {
          asistenciaEnFecha = {
            id: idAlumno,
            valor: null,
            fechaDMY
          };

        }else{
          asistenciaEnFecha = {
            id: idAlumno,
            valor: afecha.valor,
            fechaDMY
          };
        }

        /* agregar la fecha ********************** */

        alumno.asistencia.push(asistenciaEnFecha);

      });

    });


    const respuesta = {
      alumnos: alumnosEnLista,
      fechas: fechasEnLista
    };

    return respuesta;
  }
};

module.exports = ProCrearTablaAsistencia;
