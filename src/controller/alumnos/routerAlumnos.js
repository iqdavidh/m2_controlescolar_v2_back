const express = require('express');

const BuilderJsonResponse = require("../../lib/BuilderJsonResponse");
const LibValidacion = require("../../lib/LibValidacion");
const AlumnoAction = require("./AlumnoAction");
const ProDatosAlumnos = require("./proceso/ProDatosAlumno");

const routerAlumnos = express.Router();


/* agrega un alumno al grupo */
routerAlumnos.post('/grupo/:idGrupo/crear', (req, res, next) => {
  const idGrupo = req.params.idGrupo;

  let dataClean = ProDatosAlumnos.getDataClean(req.body);

  AlumnoAction.runInsert(res,idGrupo,dataClean);
});

/* eliminar los datos de un alumno */
routerAlumnos.delete('/grupo/:idGrupo/alumno/:idAlumno', (req, res, next) => {
  const idGrupo = req.params.idGrupo;
  const idAlumno = req.params.idAlumno;

  AlumnoAction.runDelete(res,idGrupo, idAlumno);

});

/* actualizar un alumno */
routerAlumnos.post('/grupo/:idGrupo/alumno/:idAlumno', (req, res, next) => {
  const idGrupo = req.params.idGrupo;
  const idAlumno = req.params.idAlumno;

  let dataClean = ProDatosAlumnos.getDataClean(req.body);


  AlumnoAction.runUpdate(res,idGrupo, idAlumno, dataClean);
});




module.exports=routerAlumnos;
