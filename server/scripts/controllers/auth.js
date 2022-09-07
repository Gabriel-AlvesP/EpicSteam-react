'use strict';

require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidV4 } = require('uuid');
const { connection } = require('../../database/dbConfig');
const { insertNewUser } = require('../../database/queries');
const { serverErr } = require('../models/errorMessages');
const { usernameValidator } = require('../models/validations');

/**
 * Sign up request handler
 * Inserts a new user in the database if his credentials are not duplicated
 * @param {*} req
 * @param {*} res
 */
async function signUp(req, res) {
	const { username, email, passwd, matchPasswd } = req.body || {};

	if (!username || !email || !passwd)
		return res
			.status(400)
			.json({ message: 'Username, email and password required.' });

	if (passwd !== matchPasswd)
		return res.status(400).json({ message: `Password must match.` });

	const hashed = await bcrypt.hash(passwd, 10);

	const user = {
		id: uuidV4(),
		Username: username,
		Email: email,
		Password: hashed,
		JoinDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
	};

	let query = `SELECT * from Users WHERE Username = "${username}";`;

	connection.query(query, (err, dbRes) => {
		if (err) return res.status(500).json({ message: serverErr });

		if (dbRes.length > 0)
			return res.status(409).json({ message: 'Credentials in use' });

		insertNewUser(user, err => {
			if (err) return res.status(500).json({ message: serverErr });

			return res.sendStatus(201);
		});
	});
}

/**
 * Login request handler
 * Validates the identity of an user
 * @param {*} req
 * @param {*} res
 */
async function signIn(req, res) {
	const { username, passwd } = req.body || {};

	if (!usernameValidator.test(username) || !passwd)
		return res.status(400).json({ message: 'Username and password required.' });

	let query = `SELECT DISTINCT usr.id, usr.username, usr.password, userRoles.Role FROM Users usr join User_Roles userRoles ON usr.id = userRoles.UserId where usr.username ="${username}"`;
	connection.query(query, async (err, dbRes) => {
		if (err) return res.status(500).json({ message: serverErr });

		const authFailed = 'Incorrect username or password';
		if (!dbRes || dbRes.length === 0)
			return res.status(401).json({ message: authFailed });

		const { id, username, password } = dbRes[0];

		//Compare input passwd with database records
		const bcryptMatch = await bcrypt.compare(passwd, password);

		if (!bcryptMatch) return res.status(401).json({ message: authFailed });

		//User roles array
		let roles = dbRes.map(elem => elem.Role);

		try {
			//Access token
			const accessToken = jwt.sign(
				{
					user: {
						id: id,
						roles: roles,
					},
				},
				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: '15m' }
			);

			//Refresh token
			const refreshToken = jwt.sign(
				{ user: id },
				process.env.REFRESH_TOKEN_SECRET,
				{ expiresIn: '1d' }
			);

			//? Should I save refresh tokens inside a hidden json file, like google do with google calendar their refresh tokens?
			//Insert refreshToken into database
			connection.query(
				`UPDATE Users SET RefreshToken=? WHERE id='${id}'`,
				refreshToken,
				(err, res) => {
					if (err) return res.status(500).json({ message: serverErr });
				}
			);

			//Response config
			res.cookie('jwt', refreshToken, {
				httpOnly: true,
				sameSite: 'None',
				secure: true, // Comment to use thunder client
				maxAge: 24 * 60 * 60 * 1000, // 1 day
			});
			res.json({ user: username, accessToken });
		} catch {
			res.status(500).json({ message: serverErr });
		}
	});
}

/**
 * Logout function
 * @param {*} req
 * @param {*} res
 * @returns
 */
function logout(req, res) {
	if (!req.cookies?.jwt) return res.sendStatus(204);
	const refreshToken = req.cookies?.jwt;

	//TODO: check refresh token before it goes into the database
	const query = `Select id from Users where refreshToken = "${refreshToken}"`;

	connection.query(query, (err, dbRes) => {
		if (err) return res.status(500).json({ message: serverErr });

		const { id } = dbRes[0] || {};

		if (id) {
			connection.query(
				'UPDATE Users SET RefreshToken=NULL where id=?',
				id,
				err => {
					if (err) return res.sendStatus(500);
				}
			);
		}

		//Clear jwt cookie
		res.clearCookie('jwt', {
			httpOnly: true,
			sameSite: 'None',
			secure: true, //! comment to use thunder client
		});
		res.sendStatus(204);
	});
}

module.exports = { signIn, signUp, logout };
