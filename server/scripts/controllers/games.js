const { connection } = require('../../database/dbConfig');
const { serverErr } = require('../models/errorMessages');

/**
 * Get from the database the 5 most played games
 * @param {Object} req request
 * @param {Object} res response
 */
function mostPlayed(req, res) {
	const query = `SELECT p.* FROM posts p LEFT JOIN users_posts up ON up.PostId=p.Id WHERE up.DidPlay=1 GROUP BY up.PostId ORDER BY count(*) desc limit 0,5;`;

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
	const query = `select * from posts order by UpVotes desc, DownVotes asc limit 0,5;`;

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
	const query = `select * from posts p order by PostDate desc limit 0,5;`;

	connection.query(query, (err, dbRes) => {
		if (err) return res.status(500).json({ message: serverErr });

		return res.json({ recentlyAdded: dbRes });
	});
}

function allGames(req, res) {
	const query = `SELECT * from posts`;

	connection.query(query, (err, dbRes) => {
		if (err) return res.status(500).json({ message: serverErr });

		return res.json({ games: dbRes });
	});
}

/**
 * Post a new game into the database
 * @param {Object} req request
 * @param {Object} res response
 */
function addGame(req, res) {
	const query = `INSERT INTO posts SET ?`;

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

module.exports = { allGames, mostPlayed, mostLiked, recentlyAdded, addGame };
