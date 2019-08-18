const ProAsistencia = {

  /* obtener el objeto fecha que se requiere para el objeto fecha de respuesta asistenca**/
  GetDataFecha(fecha) {
    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1;
    let y = fecha.getFullYear();

    let diaTexto = (dia < 10 ? '0' : '') + dia.toString();
    let mesTexto = (mes < 10 ? '0' : '') + mes.toString();

    return {
      fecha: `${diaTexto}/${mesTexto}/${y}`,
      diaSemana: fecha.getDay(),
      dia: dia,
      mes: mes,
      y: y
    }
  },

  ValidarY:(year)=>{

    if (year > 2050 || year < 2000) {
      throw new Error("Año incorrecto " + year.toString());
    }
  },
  ValidarM:(mes)=>{
    if (mes > 12 || mes < 1) {
      throw new Error("mes incorrecto " + mes.toString());
    }
  },
  ValidarD:(dia)=>{
    if ( dia > 31 || dia < 1) {
      throw new Error("dia incorrecto " + dia.toString());
    }
  }
};

module.exports = ProAsistencia;
