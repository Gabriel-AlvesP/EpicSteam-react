'use strict';

require('dotenv').config();
const db = require('../database/dbConfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const serverErr = 'Server internal error. Try again later';

//TODO: Check roles and if user is authenticated
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

/**
 * Sign up request handler
 * Inserts a new user in the database if his credentials are not duplicated
 * @param {*} req
 * @param {*} res
 */
async function signUp(req, res) {
	//! Console.log
	console.log(req);
	const { username, email, passwd, match } = req.body;

	if (!username || !email || !passwd)
		return res
			.status(400)
			.json({ message: 'Username, email and password required.' });

	if (passwd !== match)
		return res.status(400).json({ message: `Password must match.` });

	try {
		const hashed = await bcrypt.hash(passwd, 10);

		const user = {
			id: null, //TODO: uuid
			Username: username,
			Email: email,
			Password: hashed,
			JoinDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
		};

		let query = `SELECT * from Users WHERE Username = "${username}" OR Email = "${email}";`;

		db.connection.query(query, (err, dbRes) => {
			if (err) return res.status(500).json({ message: serverErr });

			if (dbRes.length > 0)
				return res.status(409).json({ message: 'Credentials in use' });

			db.connection.query(`INSERT INTO Users SET ?`, user, err => {
				if (err) return res.status(500).json({ message: serverErr });

				//TODO: Add role/Edit user
				return res.status(201).json({ user: { username } });
			});
		});
	} catch {
		res.status(500).json({ message: serverErr });
	}
}

/**
 * Login request handler
 * Validates the identity of an user
 * @param {*} req
 * @param {*} res
 */
async function signIn(req, res) {
	//! console.log
	console.log(req.body);

	const { username, passwd } = req.body;

	if (!username || !passwd)
		return res.status(400).json({ message: 'Username and password required.' });

	try {
		let query = `SELECT * from Users WHERE Username = "${username}";`;

		db.connection.query(query, async (err, dbRes) => {
			if (err) return res.status(500).json({ message: serverErr });

			const user = dbRes[0];
			const authFailed = 'Incorrect username or password';

			if (!user) return res.status(401).json({ message: authFailed });

			const bcryptMatch = await bcrypt.compare(passwd, user.password);

			if (!bcryptMatch) return res.status(401).json({ message: authFailed });

			const accessToken = jwt.sign(
				{ username: username },
				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: '15m' }
			);

			const refreshToken = jwt.sign(
				{ username: username },
				process.env.REFRESH_TOKEN_SECRET,
				{ expiresIn: '1d' }
			);

			db.connection.query(
				`UPDATE Users SET ? WHERE username = ${username}`,
				refreshToken,
				(err, res) => {
					if (err) return res.status(500).json({ message: serverErr });
				}
			);

			res.json({ accessToken });
		});
	} catch {
		res.status(500).json({ message: serverErr });
	}
}

function logOut(req, res) {}

function categories(req, res) {}

function postCategory(req, res) {
	return true;
}

function refresh(req, res) {}

module.exports = {
	users,
	signUp,
	signIn,
	logOut,
	categories,
	postCategory,
	refresh,
};
