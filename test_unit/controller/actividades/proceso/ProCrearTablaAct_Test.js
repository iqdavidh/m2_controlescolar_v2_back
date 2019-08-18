'use strict';

/**
 * Created by David on 18/07/2019.
 */


var assert = require('assert');


const ProCrearTablaAct = require("../../../../src/controller/actividades/proceso/ProCrearTablaAct");


describe('Tabla Actividades', function () {
  describe('Crear tabla normalizada con alumnos y actividades', function () {
    it('Actividades con diferentes alumnos', function () {

      let listaAct =
          [
            {
              "_id": "1",
              "tipo": "tarea",
              "titulo": "Cuadro eval firmado",
              "fecha":'2001-02-01',
              "idGrupo": "5d4af0bd0491183d949f5c17",
              "__v": 0,
              "alumnos": [
                {"id": "b", "apellidos": "Simpson", "nombre": "Bart", "calificacion": 6},
                {"id": "m", "apellidos": "Van Houten", "nombre": "Milhouse", "calificacion": 8}
              ]
            },
            {
              "_id": "examen",
              "tipo": "examen",
              "titulo": "Examen Trimestral",
              "fecha":'2001-02-01',
              "idGrupo": "5d4af0bd0491183d949f5c17",
              "__v": 0,
              "alumnos": [
                {"id": "b", "apellidos": "Simpson", "nombre": "Bart", "calificacion": 7},
                {"id": "n", "apellidos": "Muntz", "nombre": "Nelson", "calificacion": 5}
              ]
            }
          ];

      let respuestaEsperada = {
        alumnos: [
          {
            "id": "n", "nombre": "Nelson", "apellidos": "Muntz",
            act: [{"_id": "1", calificacion: null}, {"_id": "examen", calificacion: 5}]
          },

          {
            "id": "b", "nombre": "Bart", "apellidos": "Simpson",
            act: [{"_id": "1", calificacion: 6}, {"_id": "examen", calificacion: 7}]
          },
          {
            "id": "m", "nombre": "Milhouse", "apellidos": "Van Houten",
            act: [{"_id": "1", calificacion: 8}, {"_id": "examen", calificacion: null}]
          },

        ],
        actividades: [
          {"_id": "1", "tipo": "tarea", "titulo": "Cuadro eval firmado", "fechaDMY": "01/02/2001" , "fechaAbb":"Ju 01 Febrero 2001" },
          {"_id": "examen", "tipo": "examen", "titulo": "Examen Trimestral", "fechaDMY": "01/02/2001",  "fechaAbb":"Ju 01 Febrero 2001" }
        ]

      };

      let respuesta = ProCrearTablaAct.exe(listaAct);


      let ope = JSON.stringify(respuestaEsperada) === JSON.stringify(respuesta);
      if (!ope) {
        console.log('*****************************');
        console.log(JSON.stringify(respuesta));
        console.log('*****************************');
      }

      assert(ope, "La tabla normalizada no esta bien");

    });
  });
});
