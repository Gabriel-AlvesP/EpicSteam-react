const { connection } = require('./dbConfig');
const roles = require('../scripts/models/roles');

const insertData = (table, data, callback) => {
	let query = `INSERT INTO ${table} SET ${data}`;

	connection.query(query, callback);
};

const updateToken = (data, callback) => {
	let query = `UPDATE Users SET RefreshToken=? WHERE Username=?`;

	connection.query(query, data, callback);
};

module.exports = {
	updateToken,
};
