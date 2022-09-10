const { connection } = require('../../database/dbConfig');
const { serverErr } = require('../models/errorMessages');

/**
 * Get from the database the 5 most played games
 * @param {object} req request
 * @param {object} res response
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
 * @param {object} req request
 * @param {object} res response
 */
function mostLiked(req, res) {
	const query = `select p.*, count(*) as likes from Posts p left join Users_Posts up on up.postId=p.Id where up.vote=1 group by up.postId order by count(*) desc limit 0,5;`;

	connection.query(query, (err, dbRes) => {
		if (err) return res.status(500).json({ message: serverErr });

		return res.json({ mostLiked: dbRes });
	});
}

/**
 * Get the last games added into the database
 * @param {object} req request
 * @param {object} res response
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
 * @param {object} req request
 * @param {object} res response
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
 * @param {object} req request
 * @param {object} res response
 */
function getGame(req, res) {
	const { id } = req.params || {};

	if (!Number.isInteger(Number(id))) return res.sendStatus(404);

	let query = `SELECT p.*, u.username, sum(up.vote=1) as upVotes, sum(up.vote=2) as downVotes FROM Posts p inner join Users u on p.owner = u.id left join Users_Posts up on up.postId=${id} where p.id = ${id}`;
	connection.query(query, (err, dbRes) => {
		if (err) return res.status(500).json({ message: serverErr });

		if (dbRes.length !== 1) return res.sendStatus(404);

		const { owner, ...response } = dbRes[0]; //remove user id from the response object

		if (!response.upVotes) response.upVotes = 0;
		if (!response.downVotes) response.downVotes = 0;

		if (!response?.id) return res.sendStatus(404);

		return res.json(response);
	});
}

/**
 * Post a new game into the database
 * @param {object} req request
 * @param {object} res response
 */
function addGame(req, res) {
	const query = `INSERT INTO Posts SET ?`;
	const manyToManyQuery = `INSERT INTO Posts_Categories SET ?`;

	const { cover, banner } = req.files || {};
	const { title, description, price, categories } = req.body;
	const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

	connection.query(
		query,
		{
			title,
			cover: cover[0].filename,
			banner: banner[0].filename,
			description,
			price,
			postDate: timestamp,
			owner: req.uid,
		},
		(err, dbRes) => {
			if (err) return res.sendStatus(500);

			let gameId = dbRes.insertId;

			categories.split(',').forEach(categoryId => {
				connection.query(
					manyToManyQuery,
					{
						categoryId: Number(categoryId),
						postId: gameId,
					},
					err => {
						if (err) throw err;
						if (err) return res.sendStatus(500);

						return res.sendStatus(201);
					}
				);
			});
		}
	);
}

function deleteGame(req, res) {
	//const {game}
	const { id } = req.params;

	if (!Number(id)) return res.sendStatus(400);

	connection.query(`DELETE FROM Posts where id=${id}`, err => {
		if (err) throw err;
		if (err) return res.status(500).json({ message: serverErr });

		res.sendStatus(202);
	});
}

/**
 * Get users that played a game
 * @param {object} req request
 * @param {object} res response
 */
function gamePlayers(req, res) {
	const { id } = req.params || {};

	if (!Number.isInteger(Number(id))) return res.sendStatus(404);

	const query = `select u.username, bin(up.didPlay) as didPlay from Users u join Users_Posts up on up.userId = u.id where up.postId = ${id};`;
	connection.query(query, (err, dbRes) => {
		if (err) return res.sendStatus(500);

		const gamePlayers = (() => {
			let arr = [];
			dbRes.forEach(elem => Number(elem.didPlay) && arr.push(elem.username));
			return arr;
		})();

		res.json(gamePlayers);
	});
}

/**
 * Update if a user played a game
 * @param {object} req request
 * @param {object} res response
 */
function updatePlayers(req, res) {
	const { gameId, didPlay } = req.body || {};

	if (!Number(gameId) || typeof didPlay !== 'boolean') res.sendStatus(400);

	const query = `INSERT into Users_Posts(userId, postId, didPlay) VALUES('${req.uid}', ${gameId}, ${didPlay}) ON DUPLICATE KEY UPDATE didPlay=${didPlay};`;
	connection.query(query, err => {
		if (err) return res.sendStatus(500);

		res.sendStatus(201);
	});
}

/**
 * Gets an user vote (up/down vote) related to a specific game/post
 * @param {object} req request
 * @param {object} res response
 */
function getUserVote(req, res) {
	const { uid } = req;
	const { id } = req.params;

	const query = `select vote from Users_Posts where userId = '${uid}' and postId = ${id}`;
	connection.query(query, (err, dbRes) => {
		if (err) throw err;
		if (err) return res.sendStatus(500);
		res.json(dbRes[0]);
	});
}

/**
 * Inserts or updates an user vote related to a game/post
 * @param {object} req request
 * @param {object} res response
 * @returns
 */
function voteGame(req, res) {
	const { vote, gameId } = req.body || {};

	if (!Number(vote) || !Number(gameId)) return res.sendStatus(400);

	const query = `INSERT into Users_Posts(userId, postId, didPlay, vote) VALUES('${req.uid}', ${gameId}, false, ${vote}) ON DUPLICATE KEY UPDATE vote=${vote};`;
	connection.query(query, vote, err => {
		if (err) return res.sendStatus(500);

		res.sendStatus(204);
	});
}

module.exports = {
	mostPlayed,
	mostLiked,
	recentlyAdded,
	allGames,
	getGame,
	addGame,
	deleteGame,
	gamePlayers,
	updatePlayers,
	getUserVote,
	voteGame,
};
