const express = require('express');
const bodyParser = require('body-parser');

const logger = require('morgan');
const path = require('path');

const UrlApiConfig = require("./config/UrlApiConfig");
const BuilderJsonResponse = require("./lib/BuilderJsonResponse");
const DBMongo = require("./model/DbMongo"); /*<-- solo hace conexion con la base de datos */

if (!process.env) {
	process.env = {};
}

if (!process.env.PORT) {
	process.env.PORT = 3003;
}


const app = express();

const cors = require("cors");

app.use(cors());


// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.get("/", function (req, res) {
	BuilderJsonResponse.Success(res,{}, "I'm backend");
});

/*grupo *************************************************** */
{
	const routerGrupo = require("./controller/grupo/routerGrupo");
	let url=`/api/${UrlApiConfig.Grupo}`;
	app.use( url, routerGrupo);
}


/*alumnos *************************************************** */
{
	const routerAlumnos = require("./controller/alumnos/routerAlumnos");
	let url=`/api/${UrlApiConfig.Alumnos}`;
	app.use( url, routerAlumnos);
}

/*asistencia *************************************************** */
{
	const routerAsistencia = require("./controller/asistencia/routerAsistencia");
	let url=`/api/${UrlApiConfig.Asistencia}`;
	app.use( url, routerAsistencia);
}

/*actividades *************************************************** */
{
	const routerAct = require("./controller/actividades/routerAct");
	let url=`/api/${UrlApiConfig.Actividades}`;
	app.use( url, routerAct);
}

module.exports = app;
