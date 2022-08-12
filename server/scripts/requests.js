'use strict';

const db = require('../database/dbConfig');
const bcrypt = require('bcrypt');

const serverErr = 'Server error. Try again later';

//TODO: Check roles and if user is authenticated
/**
 *
 * @param {*} req request
 * @param {*} res response
 */
function users(req, res) {
	db.connection.query(`SELECT * from Users`, (err, dbRes) => {
		if (err) res.status(500).send();

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

	try {
		const hashed = await bcrypt.hash(passwd, 10);
		//TODO Use user model?!
		const user = {
			id: null,
			Username: username,
			Email: email,
			Password: hashed,
			JoinDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
		};

		let query = `SELECT * from Users WHERE Username = "${user.Username}" OR Email = "${user.Email}";`;

		db.connection.query(query, (err, dbRes) => {
			if (err) return res.status(500).json({ message: serverErr });

			if (dbRes.length > 0)
				return res.status(401).json({ message: 'Credentials in use' });

			db.connection.query(`INSERT INTO Users SET ?`, user, err => {
				if (err) return res.status(500).json({ message: serverErr });

				//TODO: Add role/Edit user
				return res.status(201).json({ message: 'success', user: { username } });
			});
		});
	} catch {
		return res.status(500).json({ message: serverErr });
	}
}

/**
 * Login request handler
 * Validates the identity of an user
 * @param {*} req
 * @param {*} res
 */
function signIn(req, res) {
	//! console.log
	console.log(req.body);

	const { username, passwd } = req.body;

	if (!username || !passwd)
		return res
			.status(400)
			.json({ message: 'Username and password are required.' });

	try {
		let query = `SELECT * from Users WHERE Username = "${username}";`;

		db.connection.query(query, (err, dbRes) => {
			if (err) return res.status(500).json({ message: serverErr });

			let user = dbRes[0];
			let authFailed = 'Incorrect username or password';

			if (!user) return res.status(401).json({ message: authFailed });

			bcrypt.compare(passwd, user.Password, (err, bcryptRes) => {
				if (err) res.status(500).json({ message: serverErr });

				if (bcryptRes) return res.status(200).json({ message: 'success' }); //? 302

				return res.status(401).json({ message: authFailed });
			});
		});
	} catch {
		res.status(500).json({ message: serverErr });
	}
}

module.exports = { users, signUp, signIn };
