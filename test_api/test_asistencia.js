'use strict';


const supertest = require('supertest');
const assert = require('assert');
const LibTest = require('./LibTest');
const DataTest = require("./DataTest");

let url = "http://localhost:3003"; //<-- es nuestro sitio backend

const fNow = new Date();
const dataRandom = `${fNow.getHours()}:${fNow.getMinutes()}:${fNow.getSeconds()} `;
const idGrupo= DataTest.idGrupo;

const request = supertest(url);


describe('asistencia idGrupo dia - api/asistencia/grupo/:idGrupo/:Y/:m/:d GET OK', function () {
  it('ok get la asitencia de un dia no registrado', function (done) {


    request
        .get('/api/asistencia/grupo/' + idGrupo + '/2000/01/01')
        .expect(200)
        .end(function (err, res) {

          const c = JSON.parse(res.text);

          LibTest.saveResponse(res.text, './asistencia_dia.json');

          assert(c.success, "Se esperada true como tipo de success");
          assert(c.msg === "");

          assert(typeof c.data === "object", "El objeto data deberia deberia ser un objeto");

          assert(c.data.total.toString() === "1",);
          assert(c.data.alumnos.length > 0, "El array de alumnos no esta funcioonando");
          assert(c.data.fechas.length > 0, "El array de fechas no esta funcioonando");


          let isValid = LibTest.ValidarTieneProp(c.data.alumnos[0], ['id', 'valor']);
          assert(isValid === true, isValid);

          isValid = LibTest.ValidarTieneProp(c.data.fechas[0], ['fecha', 'diaSemana', 'dia', 'mes', 'y']);
          assert(isValid === true, isValid);


          if (err) return done(err);
          done();
        })
    ;
  });
});


const asistenciaAlumno = [
  {
    id: 1,
    valor: 1,
    nombre: "bart",
    apellidos: "simpson"
  },
  {
    id: 2,
    valor: 1,
    nombre: "Milhouse",
    apellidos: "Van Houten"
  }];

describe('actualizar asistenciua idGrupo dia - api/asistencia/grupo/:idGrupo/y/m/d POST OK', function () {
  it('ok post la asitencia de un dia', function (done) {


    const describeDelete = (y, m, d) => {
      describe('delete asistenciua idGrupo dia - api/asistencia/grupo/:idGrupo/y/m/d DELETE OK', function () {
        it('ok delete la asitencia de un dia', function (done) {

          request
              .delete(`/api/asistencia/grupo/${idGrupo}/${y}/${m}/${d}`)
              .expect(200)
              .end(function (err, res) {

                const c = JSON.parse(res.text);

                LibTest.saveResponse(res.text, './asistencia_delete.json');

                assert(c.success, "Se esperada true como tipo de success");
                assert(c.msg === "");
                assert(typeof c.data === "object", "El objeto data deberia deberia ser un objeto");


                if (err) return done(err);
                done();

              })
          ;
        });
      });
    };


    request
        .post('/api/asistencia/grupo/' + idGrupo + '/2001/01/03')
        .expect(200)
        .send(asistenciaAlumno)
        .end(function (err, res) {

          const c = JSON.parse(res.text);

          LibTest.saveResponse(res.text, './asistencia_dia_insert.json');

          assert(c.success, "Se esperada true como tipo de success");
          assert(c.msg === "");

          assert(typeof c.data === "object", "El objeto data deberia deberia ser un objeto");

           describeDelete(2001, 1, 3);

          if (err) return done(err);
          done();
        })
    ;
  });
});

describe('asistencia   api/asistencia/grupo/:idGrupo/pagina/1 GET 1', function () {
  it('ok get la asitencia pagina de  un grupo', function (done) {


    request
        .get('/api/asistencia/grupo/' + idGrupo + '/pagina/1')
        .expect(200)
        .end(function (err, res) {

          const c = JSON.parse(res.text);

          LibTest.saveResponse(res.text, './asistencia_pagina.json');

          assert(c.success, "Se esperada true como tipo de success");
          assert(c.msg === "");

          assert(typeof c.data === "object", "El objeto data deberia deberia ser un objeto");

          assert(c.data.total > 0, "El total viene vacio");
          assert(c.data.alumnos.length > 0, "El array de alumnos no esta funcioonando");
          assert(c.data.fechas.length > 0, "El array de fechas no esta funcioonando");
          assert(c.data.pagina === "1", "Esperamos la pagina 1");



          let isValid = LibTest.ValidarTieneProp(c.data, ['total','pagina','alumnos']);
          assert(isValid === true, isValid);


          const alumno=c.data.alumnos[0];
          isValid = LibTest.ValidarTieneProp(alumno, ['id','nombre','apellidos','asistencia']);
          assert(isValid === true, isValid);

          const asistenciaItem=alumno.asistencia[0];
          isValid = LibTest.ValidarTieneProp(asistenciaItem, ['id','valor','fechaDMY']);
          assert(isValid === true, isValid);


          isValid = LibTest.ValidarTieneProp(c.data.fechas[0], ['fechaDMY', 'dia', 'fechaAbb']);
          assert(isValid === true, isValid);



          if (err) return done(err);
          done();
        })
    ;
  });
});


describe('asistencia   api/asistencia/grupo/:idGrupo/y/m GET 1', function () {

  it('ok get la asitencia y/m  un grupo', function (done) {


    request
        .get('/api/asistencia/grupo/' + idGrupo + '/2001/1')
        .expect(200)
        .end(function (err, res) {

          const c = JSON.parse(res.text);

          LibTest.saveResponse(res.text, './asistencia_mes.json');

          assert(c.success, "Se esperada true como tipo de success");
          assert(c.msg === "");

          assert(typeof c.data === "object", "El objeto data deberia deberia ser un objeto");

          assert(c.data.total > 0, "El total viene vacio");
          assert(c.data.alumnos.length > 0, "El array de alumnos no esta funcioonando");
          assert(c.data.fechas.length > 0, "El array de fechas no esta funcioonando");

          let isValid = LibTest.ValidarTieneProp(c.data, ['total','alumnos','fechas','next']);
          assert(isValid === true, isValid);


          const alumno=c.data.alumnos[0];
          isValid = LibTest.ValidarTieneProp(alumno, ['id','nombre','apellidos','asistencia']);
          assert(isValid === true, isValid);

          const asistenciaItem=alumno.asistencia[0];
          isValid = LibTest.ValidarTieneProp(asistenciaItem, ['id','valor','fechaDMY']);
          assert(isValid === true, isValid);


          isValid = LibTest.ValidarTieneProp(c.data.fechas[0], ['fechaDMY', 'dia', 'fechaAbb']);
          assert(isValid === true, isValid);



          if (err) return done(err);
          done();
        })
    ;
  });
});


