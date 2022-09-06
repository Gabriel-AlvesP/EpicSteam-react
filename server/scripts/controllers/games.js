const { connection } = require('../../database/dbConfig');
const { serverErr } = require('../models/errorMessages');

/**
 * Get from the database the 5 most played games
 * @param {Object} req request
 * @param {Object} res response
 */
function mostPlayed(req, res) {
	const query = `SELECT p.* FROM Posts p LEFT JOIN Users_Posts up ON up.PostId=p.Id WHERE up.DidPlay=1 GROUP BY up.PostId ORDER BY count(*) desc limit 0,5;`;

	connection.query(query, (err, dbRes) => {
		if (err) return res.status(500).json({ message: serverErr });

		return res.json({ mostPlayed: dbRes });
	});
}

/**
 * Get from the database the 5 most liked games (most up votes)
 * @param {Object} req request
 * @param {Object} res response
 */
function mostLiked(req, res) {
	const query = `select * from Posts order by UpVotes desc, DownVotes asc limit 0,5;`;

	connection.query(query, (err, dbRes) => {
		if (err) return res.status(500).json({ message: serverErr });

		return res.json({ mostLiked: dbRes });
	});
}

/**
 * Get the last games added into the database
 * @param {Object} req request
 * @param {Object} res response
 */
function recentlyAdded(req, res) {
	const query = `select * from Posts p order by PostDate desc limit 0,5;`;

	connection.query(query, (err, dbRes) => {
		if (err) return res.status(500).json({ message: serverErr });

		return res.json({ recentlyAdded: dbRes });
	});
}

/**
 * Get all games
 * @param {Object} req request
 * @param {Object} res response
 */
function allGames(req, res) {
	const query = `SELECT * from Posts`;

	connection.query(query, (err, dbRes) => {
		if (err) return res.status(500).json({ message: serverErr });

		return res.json({ games: dbRes });
	});
}

/**
 * Get a information about a game
 *
 * @param {Object} req request
 * @param {Object} res response
 */
function getGame(req, res) {
	const { id } = req.params || {};

	if (!Number.isInteger(Number(id))) return res.sendStatus(404);

	const query = `SELECT p.*, u.username FROM Posts p left join Users u on p.owner = u.id where p.id = ${id}`;
	connection.query(query, (err, dbRes) => {
		if (err) return res.status(500).json({ message: serverErr });

		if (dbRes.length !== 1) return res.sendStatus(404);
		const { owner, ...response } = dbRes[0]; //remove user id from the response object

		return res.json(response);
	});
}

/**
 * Post a new game into the database
 * @param {Object} req request
 * @param {Object} res response
 */
function addGame(req, res) {
	const query = `INSERT INTO Posts SET ?`;

	const { filename } = req.file;
	const { title, description, price, categoryId } = req.body;
	const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

	connection.query(
		`select Id from users where username=${req.username}`,
		(err, dbRes) => {
			if (err) return res.sendStatus(500);

			if (dbRes.length === 0) return res.sendStatus(401);

			connection.query(
				query,
				{
					title,
					photo: filename,
					description,
					price,
					postDate: timestamp,
					categoryId,
					owner: dbRes,
				},
				err => {
					if (err) return res.sendStatus(500);

					return res.sendStatus(201);
				}
			);
		}
	);
}

module.exports = {
	mostPlayed,
	mostLiked,
	recentlyAdded,
	allGames,
	getGame,
	addGame,
};
