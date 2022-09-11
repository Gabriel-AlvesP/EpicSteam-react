const { connection } = require('../../database/dbConfig');

/**
 * Verifies if the current user is the owner of a post/game
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
const checkOwnership = (req, res, next) => {
	const uid = req?.uid;
	const { id } = req.params;

	if (req.roles.includes(1899)) {
		next();
	} else {
		const query = `select owner from Posts where id=${id} and owner='${uid}'`;
		connection.query(query, (err, dbRes) => {
			if (err) return res.sendStatus(500);

			if (dbRes.length > 0) next();
			else return res.sendStatus(403);
		});
	}
};

module.exports = checkOwnership;
