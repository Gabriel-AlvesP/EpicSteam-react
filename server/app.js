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
const corsOptions = require('./config/cors');

// Configs
const app = express();
const PORT = process.env.PORT || 3031;

// Express config
app.use(cors(corsOptions)); // Cors
app.use(logger('dev')); // Logger
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database
database.buildDb();

// Routing
app.use('/', routes);

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
