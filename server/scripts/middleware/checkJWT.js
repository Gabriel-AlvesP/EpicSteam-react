require('dotenv').config();
const jwt = require('jsonwebtoken');

/**
 * Check access jwt token
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const checkJWT = (req, res, next) => {
	const auth = req.headers.authorization || req.headers.Authorization; //Catch any case

	//? 401 to denied permission || 404 to hide page existence
	if (!auth?.startsWith('Bearer ')) return res.sendStatus(404);

	const token = auth.split(' ')[1]; //Get token
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
		if (err) return res.sendStatus(403);

		req.user = decoded.user.username;
		req.roles = decoded.user.roles;

		next();
	});
};

module.exports = checkJWT;
