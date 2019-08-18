'use strict';

/**
 * Created by David on 18/07/2019.
 */

const fNow = new Date();
const dataRandom = `${fNow.getHours()}:${fNow.getMinutes()}:${fNow.getSeconds()} `;

const supertest = require('supertest');
const assert = require('assert');
const LibTest = require('./LibTest');
const DataTest = require("./DataTest");

let url = "http://localhost:3003"; //<-- es nuestro sitio backend

const idGrupo= DataTest.idGrupo;

const request = supertest(url);


describe('grupo index - grupo/index GET  ok', function () {
  it('ok respuesta basica', function (done) {
    request
        .get('/api/grupo/index')
        .expect(200)
        .end(function (err, res) {

          const c = JSON.parse(res.text);

          LibTest.saveResponse(res.text, './grupo_index.json');

          assert(c.success, "Se esperada true como tipo de success");
          assert(c.msg === "");

          assert(typeof c.data === "object", "El objeto data deberia deberia ser un objeto");

          assert(c.data.total > 0, "El numero de grupo");
          assert(c.data.items.length > 0, "El numero de items deber ser  mayor a 0");
          //TODO el data next, porque deberiamos usarlo


          let row = c.data.items[0];
          let listaP = ['_id', 'nombre', 'escuela', 'materia'];
          let isValid = LibTest.ValidarTieneProp(row, listaP);

          assert(isValid === true, isValid);

          if (err) return done(err);
          done();
        })
    ;
  });
});

describe('grupo find - /grupo/:idGrupo GET  ok' , function () {
  it('ok respuesta basica', function (done) {
    request
        .get('/api/grupo/'+idGrupo)
        .expect(200)
        .end(function (err, res) {

          const c = JSON.parse(res.text);

          LibTest.saveResponse(res.text, './grupo_findById.json');

          assert(c.success, "Se esperada true como tipo de success");
          assert(c.msg === "");

          assert(typeof c.data === "object", "El objeto data deberia deberia ser un objeto");


          let listaP = ['_id', 'nombre', 'escuela', 'materia', 'ciclo',
            'ymini', 'ymfin', 'comentarios', 'alumnos'];

          let isValid = LibTest.ValidarTieneProp(c.data, listaP);
          assert(isValid === true, isValid);

          let alumno=c.data.alumnos[0];
          isValid = LibTest.ValidarTieneProp(alumno, ['id','nombre','apellidos']);
          assert(isValid === true, isValid);



          if (err) return done(err);
          done();
        })
    ;
  });

});

describe('grupo update - /grupo/:idGrupo POST  ok', function () {
  it('ok respuesta basica', function (done) {

    const dataUpdate = {
      "comentarios": "comentario at " + dataRandom
    };

    request
        .post('/api/grupo/' + idGrupo)
        .send(dataUpdate)
        .expect(200)
        .end(function (err, res) {

          const c = JSON.parse(res.text);

          LibTest.saveResponse(res.text, './grupo_update.json');

          assert(c.success, "Se esperada true como tipo de success");
          assert(c.msg === "");

          assert(typeof c.data === "object", "El objeto data deberia deberia ser un objeto");

          let listaP = ['_id'];
          let isValid = LibTest.ValidarTieneProp(c.data, listaP);

          assert(isValid === true, isValid);

          if (err) return done(err);
          done();
        })
    ;
  });

});


describe('grupo - crear /grupo/crear POST  ok ', function () {
  it('ok', function (done) {

    const dataCrear = {
      "nombre": "411-" + dataRandom,
      "materia": "dibujo-" + dataRandom,
      "escuela": "primaria springfil" + dataRandom,
      "ciclo": "1990-2050",
      "ymini": 199001,
      "ymfin": 205001,
      "comentarios": "comentario create-" + dataRandom
    };

    request
        .post('/api/grupo/crear')
        .send(dataCrear)
        .expect(200)
        .end(function (err, res) {

          const c = JSON.parse(res.text);

          LibTest.saveResponse(res.text, './grupo_update.json');

          assert(c.success, "Se esperada true como tipo de success");
          assert(c.msg === "");

          assert(typeof c.data === "object", "El objeto data deberia deberia ser un objeto");

          const idCreado = c.data._id;
          let listaP = ['_id'];
          let isValid = LibTest.ValidarTieneProp(c.data, listaP);

          assert(isValid === true, isValid);

          /* *********************************** */
          describe('grupo delete - /grupo/:idGrupo DELETE  ok', function () {
            it('ok respuesta basica', function (done) {
              request
                  .delete('/api/grupo/'+idCreado)
                  .expect(200)
                  .end(function (err2, res2) {

                    const c2 = JSON.parse(res2.text);

                    LibTest.saveResponse(res2.text, './grupo_findById.json');

                    assert(c2.success, "Se esperada true como tipo de success");
                    assert(c2.msg === "");

                    assert(typeof c2.data === "object", "El objeto data deberia deberia ser un objeto");


                    let listaP2 = ['_id'];

                    let isValid2 = LibTest.ValidarTieneProp(c2.data, listaP2);

                    assert(isValid2 === true, isValid2);

                    if (err2) return done(err2);
                    done();
                  })
              ;
            });

          });

          /* *********************************** */

          if (err) return done(err);
          done();
        })
    ;
  });

});








