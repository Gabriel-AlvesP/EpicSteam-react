const { connection } = require('./dbConfig');

const updateToken = (data, callback) => {
	let query = `UPDATE Users SET RefreshToken=? WHERE Username=?`;

	connection.query(query, data, callback);
};

module.exports = {
	updateToken,
};
