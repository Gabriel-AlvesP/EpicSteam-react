'use strict';

require('dotenv').config();
const db = require('../../database/dbConfig');
const jwt = require('jsonwebtoken');
const serverErr = 'Server internal error. Try again later';

function refreshTokenHandler(req, res) {
	if (!req.cookies?.jwt) return res.sendStatus(401); //TODO: 401 or 404?
	const refreshToken = req.cookies.jwt;

	const query = `SELECT username from Users WHERE RefreshToken = "${refreshToken}";`;

	db.connection.query(query, async (err, dbRes) => {
		if (err) return res.status(500).json({ message: serverErr });

		const { username } = dbRes[0];

		//User not found
		if (!username) return res.sendStatus(403);

		jwt.verify(
			refreshToken,
			process.env.REFRESH_TOKEN_SECRET,
			(err, decoded) => {
				if (err || username !== decoded.username) return res.sendStatus(403);

				const accessToken = jwt.sign(
					{ username: decoded.username },
					process.env.ACCESS_TOKEN_SECRET,
					{ expiresIn: '15m' }
				);
				res.json({ accessToken });
			}
		);
	});
}

module.exports = { refreshTokenHandler };
