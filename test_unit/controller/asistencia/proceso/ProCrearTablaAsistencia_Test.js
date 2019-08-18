'use strict';

/**
 * Created by David on 18/07/2019.
 */


var assert = require('assert');
const ProCrearTablaAsistencia = require("../../../../src/controller/asistencia/proceso/ProCrearTablaAsistencia");


describe('Tabla Asistencia', function () {
  describe('Crear tabla normalizada con alumnos y lista de asitencia', function () {
    it('Fechas con diferentes alumnos', function () {

      let listaAsistencia = [
        {
          "_id": "5d4ae86bbeb71079dd84b196",
          "fecha": '2001-01-01',
          "idGrupo": "5d4af0bd0491183d949f5c17",
          "alumnos": [
            {"id": "bs", "valor": 1, "nombre": "Bart", "apellidos": "Simpson"},
            {"id": "m", "valor": 0, "nombre": "Milhouse", "apellidos": "Van Houten"}]
        },
        {
          "_id": "5d4ae899beb71079dd84b1cd",
          "fecha": '2001-01-02',
          "idGrupo": "5d4af0bd0491183d949f5c17",
          "__v": 0,
          "alumnos": [
            {"id": "bs", "valor": 1, "nombre": "Bart", "apellidos": "Simpson"},
            {"id": "m", "valor": 1, "nombre": "Milhouse", "apellidos": "Van Houten"},
            {"id": "rafita", "valor": 1, "nombre": "Rafita", "apellidos": "Gorgori"}
          ]
        }
      ];

      let respuestaEsperada = {
        alumnos: [
          {
            "id": "rafita", "nombre": "Rafita", "apellidos": "Gorgori",
            asistencia: [
              {"id": "rafita", "valor": null, "fechaDMY": "01/01/2001"},
              {"id": "rafita", "valor": 1, "fechaDMY": "02/01/2001"}]
          },
          {
            "id": "bs",  "nombre": "Bart", "apellidos": "Simpson",
            asistencia: [
              {"id": "bs", "valor": 1, "fechaDMY": "01/01/2001"},
              {"id": "bs", "valor": 1, "fechaDMY": "02/01/2001"}
            ]
          },
          {
            "id": "m", "nombre": "Milhouse", "apellidos": "Van Houten",
            asistencia: [
              {"id": "m", "valor": 0, "fechaDMY": "01/01/2001"},
              {"id": "m", "valor": 1, "fechaDMY": "02/01/2001"}
            ]
          }
        ],
        fechas: [
          {"fechaDMY": "01/01/2001", "fechaAbb": "Lu 01 Enero 2001", "dia": 1},
          {"fechaDMY": "02/01/2001", "fechaAbb": "Ma 02 Enero 2001", "dia": 2},
        ]

      };

      let respuesta = ProCrearTablaAsistencia.exe(listaAsistencia);


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
