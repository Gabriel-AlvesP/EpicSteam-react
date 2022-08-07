'use strict';

const db = require('../database/dbConfig');
const bcrypt = require('bcrypt');

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
	try {
		const hashed = await bcrypt.hash(req.body.passwd, 10);
		//TODO Use user model?!
		const user = {
			id: null,
			Username: req.body.username,
			Email: req.body.email,
			Password: hashed,
			Role: 2,
			JoinDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
		};

		let query = `SELECT * from Users WHERE Username = "${user.Username}" OR Email = "${user.Email}";`;

		db.connection.query(query, (err, dbRes) => {
			if (err) res.status(500).json({ message: 'Server error' });

			if (dbRes.length > 0) {
				//res.status(200).send('Credentials in use'); // 200 re-render or 401 ?
				res.status(200).json({ message: 'Credentials in use' });
			} else {
				db.connection.query(`INSERT INTO Users SET ?`, user, err => {
					if (err) throw err;

					res.status(201).json({ message: 'success', user: user });
				});
			}
		});
	} catch {
		res.status(500).json({ message: 'Server Error' });
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
	try {
		let query = `SELECT * from Users WHERE Username = "${req.body.username}";`;

		db.connection.query(query, (err, dbRes) => {
			if (err)
				res.status(500).json({ message: 'Server error. Try again later' });

			let user = dbRes[0];
			if (user == null) {
				res.status(200).json({ message: 'Incorrect username or password' });
			} else {
				bcrypt.compare(req.body.passwd, user.Password, (err, bcryptRes) => {
					if (err) res.status(500).json({ message: 'Server error' });

					if (bcryptRes) {
						res.json({ message: 'success' }); //? 302
					} else {
						res.status(200).json({ message: 'Incorrect username or password' });
					}
				});
			}
		});
	} catch {
		res.status(500).json({ message: 'Server error. Try again later' });
	}
}

module.exports = { users, signUp, signIn };
