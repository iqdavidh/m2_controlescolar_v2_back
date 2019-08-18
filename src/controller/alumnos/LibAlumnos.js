const LibAlumnos ={
  sort : ( alumnos)=>{

    alumnos.sort((a, b) => {

      if (a.apellidos === b.apellidos) {

        if (a.nombre > b.nombre) {
          return 1;
        } else {
          return -1;
        }

      } else {

        if (a.apellidos === b.apellidos) {
          return 0;
        } else {
          if (a.apellidos > b.apellidos) {
            return 1;
          } else {
            return -1;
          }
        }

      }


    });

  }
};

module.exports = LibAlumnos;
