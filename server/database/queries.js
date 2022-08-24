const { connection } = require('./dbConfig');
const roles = require('../scripts/models/roles');

const insertData = (table, data, callback) => {
	let query = `INSERT INTO ${table} SET ${data}`;

	connection.query(query, callback);
};

const insertNewUser = (user, callback) => {
	let query = 'INSERT INTO Users SET ?';
	let rolesQuery = 'INSERT INTO User_Roles SET ?';
	let defaultRole = {
		Role: roles.visitor,
		UserId: user.id,
	};
	connection.query(query, user, err => {
		if (err) callback(err);

		connection.query(rolesQuery, defaultRole, err => {
			callback(err);
		});
	});
};

const updateToken = (data, callback) => {
	let query = `UPDATE Users SET RefreshToken=? WHERE Username=?`;

	connection.query(query, data, callback);
};

module.exports = {
	insertNewUser,
	updateToken,
};
