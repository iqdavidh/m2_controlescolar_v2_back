'use strict';

/**
 * Created by David on 18/07/2019.
 */

const env = require("../../../../apps/env.json");

const backPort = 3003;
const frontPort = 4003;

const urlFront = env.site + `:${frontPort}`;
const urlApi = env.site + `:${backPort}/api`;

const isServerDev = env.server === "local";

const urlMongoServer = env.urlMongoServer;

const ServerConfig = {
	isServerDev: isServerDev,
	urlMongoServer: urlMongoServer,
	mongo_user: env.mongo_user,
	mongo_pass: env.mongo_pass,
	backPort: backPort,
	frontPort: frontPort,
	urlFront: urlFront,
	urlApi: urlApi
};


module.exports = ServerConfig;
