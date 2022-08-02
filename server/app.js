'use strict';
/**
 * GamesLibrary
 * Gabriel A. Pais - 201900301
 * Web server implementation
 */

// Imports
require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const database = require('./database/dbConfig');
const routes = require('./scripts/router/routes');

// Configs
const app = express();
const PORT = process.env.PORT || 3001;

// Cors config
const whiteList = ['localhost:3000'];
const corsOptions = {
	origin: function (origin, callback) {
		if (whiteList.indexOf(origin) !== -1) callback(null, true);
		else callback(new Error('Not allowed by CORS...'));
	},
	optionsSuccessStatus: 200,
};

// Express config
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database
database.buildDb();

// Routing
app.use('/', routes);

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
