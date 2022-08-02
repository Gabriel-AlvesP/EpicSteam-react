const mysql = require('mysql');
const fs = require('fs');
const util = require('util');
if (process.env.NODE_ENV === 'development') require('dotenv').config(); //Environment variables
const { dummyData } = require('./dummy');

/**
 * Create database connections
 */
const fDbConnection = mysql.createConnection({
	host: process.env.HOST || 'localhost',
	user: process.env.USR || 'root',
	password: process.env.PASSWD,
});

const dbConnection = mysql.createConnection({
	host: process.env.HOST || 'localhost',
	user: process.env.USR || 'root',
	password: process.env.PASSWD,
	database: process.env.DB || 'gameslibrary',
});
module.exports.connection = dbConnection;

/**
 * Import a file to alter the database
 * @param {string} path - path to the file
 */
const fetchFile = async path => {
	const readFile = util.promisify(fs.readFile);
	const buff = await readFile(path);
	const data = buff.toString();

	const allLines = data.split(/\r?\n/);

	allLines.forEach(line => {
		dbConnection.query(line, (err, res) => {
			errorHandling(err, []);
		});
	});
	console.log('\nTables created...');
	populateDb();
};

/**
 * Fill the database with dummy data
 */
function populateDb() {
	for (let i = 0; i < dummyData[0].length; i++) {
		dbInsert(dummyData[0][i], dummyData[1][i]);
	}
}

/**
 * Insert/put data in the database
 * @param {string} tableName - name of the table to insert in
 * @param {object} data - corresponding to the table information
 */
function dbInsert(tableName, data) {
	let sqlQuery = `INSERT IGNORE INTO ${tableName} SET ?`;

	dbConnection.query(sqlQuery, data, (err, res) => {
		if (res.warningCount === 0)
			errorHandling(err, [`\nAdded to ${tableName}...`]);
	});
}

/**
 * Creates the database (if needed) and inserts tables
 */
function createDb() {
	let sqlQuery = `CREATE DATABASE IF NOT EXISTS ${process.env.DB}`;

	//(err, res) stand for (error, result)
	fDbConnection.query(sqlQuery, (err, res) => {
		if (res.warningCount === 0) {
			errorHandling(err, [res, '\nDatabase created...']);
			//import tables + populate
			fetchFile('database/create.sql');
		}
	});
}

/**
 * Invoke all necessary functions
 * to make sure that the database works fine
 */
function buildDb() {
	fDbConnection.connect(err => {
		errorHandling(err, ['Connected to database...']);
		createDb();
		fDbConnection.end();
	});
}
module.exports.buildDb = buildDb;

/**
 * Handles the errors and prints messages in the console
 * @param {string} err - error
 * @param {array} arr - array with messages returned by other functions
 */
function errorHandling(err, arr) {
	if (err) throw err;
	for (let i = 0; i < arr.length; i++) {
		console.log(arr[i]);
	}
}
