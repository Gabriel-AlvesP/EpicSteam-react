const { connection } = require('./dbConfig');

//TODO Update
const get = (query, data = '', callback) => {
	if (data) connection.query(query, data, callback);
	else connection.query(query, callback);
};

const getAsync = async (query, data, callback) => {
	connection.query(query, data, callback);
};

const insert = (table, data, callback) => {
	let query = `INSERT INTO ${table} SET ?`;

	connection.query(query, data, callback);
};

const insertNewUser = (user, callback) => {
	let query = 'INSERT INTO Users SET ?';
	let rolesQuery = 'INSERT INTO User_Roles SET ?';
	let defaultRole = {
		Role: 666,
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

module.exports = { get, getAsync, insertNewUser, updateToken };
