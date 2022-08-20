const { connection: database } = require('../../database/dbConfig');

function mostPlayed(req, res) {
	const query = `SELECT * FROM posts ORDER BY `;

	database.query(query, (err, res) => {});
}

module.exports = { mostPlayed };
