'use strict';

require('dotenv').config();
const db = require('../../database/dbConfig');
const jwt = require('jsonwebtoken');
const serverErr = 'Server internal error. Try again later';

/**
 * Generates a new access token using the refresh token to authenticate the user
 * @param {*} req request
 * @param {*} res response
 * @returns accessToken
 */
function refreshTokenHandler(req, res) {
	//Check refresh token existence
	if (!req.cookies?.jwt) return res.sendStatus(401);

	const refreshToken = req.cookies.jwt;

	//Validate user refresh token + Get username and roles
	const query = `SELECT DISTINCT usr.username, userRoles.Role from Users usr join  User_Roles userRoles ON userRoles.UserId = usr.id WHERE RefreshToken = "${refreshToken}";`;
	db.connection.query(query, async (err, dbRes) => {
		if (err) return res.status(500).json({ message: serverErr });

		const { username } = dbRes[0] || {};

		//User not found
		if (!username) return res.sendStatus(403);

		//User roles
		let roles = dbRes.map(elem => elem.Role);

		//Verify refresh token authenticity
		jwt.verify(
			refreshToken,
			process.env.REFRESH_TOKEN_SECRET,
			(err, decoded) => {
				if (err || username !== decoded.username) return res.sendStatus(403);

				//Sign new access token
				const accessToken = jwt.sign(
					{
						user: {
							username: decoded.username,
							roles: roles,
						},
					},
					process.env.ACCESS_TOKEN_SECRET,
					{ expiresIn: '15m' }
				);
				//Send the new accessToken
				res.json({ username, accessToken });
			}
		);
	});
}

module.exports = { refreshTokenHandler };
