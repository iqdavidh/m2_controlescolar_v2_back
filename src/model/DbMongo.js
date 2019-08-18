const mongoose = require("mongoose");
const ServerConfig = require("../ServerConfig");

let url = ServerConfig.urlMongoServer;

let opcionesMongoose = {
  useNewUrlParser: true
};

if (!ServerConfig.isServerDev) {
  const user = encodeURIComponent(ServerConfig.mongo_user);
  const password = encodeURIComponent(ServerConfig.mongo_pass);
  const authMechanism = 'DEFAULT';
  url = `mongodb://${user}:${password}@localhost:27017`;
}

url = url + '/controlescolar';
console.log(url);

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);

const cx = mongoose.connect(url, opcionesMongoose)
    .then(x => {
      console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    })
    .catch(err => {
      console.error('Error connecting to mongo', err)
    });

const Grupos = require("./Grupos");
const Asistencia = require("./Asistencia");
const Actividades = require("./Actividades");

module.exports = {
  cx: cx,
  Grupos: Grupos,
  Asistencia: Asistencia,
  Actividades:Actividades
};
