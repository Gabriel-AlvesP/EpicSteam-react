const db = require('../../database/dbConfig');

/**
 *
 * @param {*} req request
 * @param {*} res response
 */
function users(req, res) {
	db.connection.query(`SELECT * from Users`, (err, dbRes) => {
		if (err) res.status(500).json({ message: serverErr });

		res.json(dbRes);
	});
}

module.exports = { users };
