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


describe('alumno crear - api/alumnos/grupo/:idGrupo/crear POST ok', function () {
  it('ok agregar alumno', function (done) {

    const requestDelete= (idNewAlumno)=>{

      describe('alumno delete - api/alumnos/grupo/:idGrupo/alumno/:idAlumno DELETE ok', function () {
        it('ok agregar alumno', function (done) {


          request
              .delete('/api/alumnos/grupo/' + idGrupo + '/alumno/' + idNewAlumno)
              .expect(200)
              .end(function (err, res) {

                const c = JSON.parse(res.text);

                LibTest.saveResponse(res.text, './alumnos_delete.json');

                assert(c.success, "Se esperada true como tipo de success");
                assert(c.msg === "");

                assert(typeof c.data === "object", "El objeto data deberia deberia ser un objeto");

                assert(c.data._id !== "", "El id de grupo");
                assert(c.data.idAlumno !== "", "El id de alumno");

                if (err) return done(err);
                done();
              })
          ;


        });
      });



    };

    request
        .post('/api/alumnos/grupo/'+idGrupo +'/crear')
        .send({nombre: "bart" + dataRandom, "apellidos": "simson" + dataRandom})
        .expect(200)
        .end(function (err, res) {

          const c = JSON.parse(res.text);

          LibTest.saveResponse(res.text, './alumnos_crear.json');

          assert(c.success, "Se esperada true como tipo de success");
          assert(c.msg === "");

          assert(typeof c.data === "object", "El objeto data deberia deberia ser un objeto");

          assert(c.data._id !=="", "El numero de grupo");
          assert(c.data.idAlumno !=="", "El numero de items deber ser  mayor a 0");


          /*eliminar el registro *************************************** */
          requestDelete(c.data.idAlumno);

          if (err) return done(err);
          done();
        })
    ;
  });
});
