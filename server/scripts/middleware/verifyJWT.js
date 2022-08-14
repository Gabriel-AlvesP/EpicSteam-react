require('dotenv').config();
const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next) {
	const auth = req.header['authorization'];

	//? 401 to denied permission || 404 to hide page existence
	if (!auth) return res.sendStatus(404);

	//!clg
	console.log(auth);
	const token = auth.split('')[1];
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (req, decoded) => {
		if (err) return res.sendStatus(403);

		req.user = decoded.username;
		next();
	});
}

module.exports = verifyJWT;
